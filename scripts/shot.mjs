// Screenshot one or more routes with headless Chromium, logged in as the demo user.
// Starts the dev server automatically if it isn't running.
//
//   npm run shot -- /query                    desktop 1440x900, viewport only
//   npm run shot -- / /query --full           full-page screenshots
//   npm run shot -- /query --mobile           390x844 phone viewport
//   npm run shot -- /login --logged-out       view as an anonymous visitor
//   npm run shot -- /query --wait 3000        wait longer for animations / 3D to settle
//   npm run shot -- /query --selector main    screenshot a single element
//   npm run shot -- /query --scroll 1200      scroll down N px before capturing
//   npm run shot -- /query --fill textarea "ERR 0x4F2 spindle" --click "text=Run diagnosis" --wait 4000
//                                             interact first (actions run in order, then capture)
//
// Selectors are Playwright selectors: CSS ("textarea", "#id"), "text=Label", "role=button[name=Save]".
//
// Prints the PNG paths (under .agent/shots/) plus any console errors, uncaught page
// errors and failed requests. Open the PNGs with the Read tool to look at them.

import { mkdirSync } from "node:fs";
import path from "node:path";
import { ensureServer } from "./dev-server.mjs";

// Git Bash (MSYS) rewrites "/query" into "C:/Program Files/Git/query" before node sees it. Undo that.
const msysRoot = process.env.MSYSTEM && process.env.EXEPATH ? path.dirname(process.env.EXEPATH).replaceAll("\\", "/") : null;
const unmangle = (a) => (msysRoot && a.toLowerCase().startsWith(msysRoot.toLowerCase()) ? a.slice(msysRoot.length) || "/" : a);

const args = process.argv.slice(2).map(unmangle);
const routes = [];
const opts = { full: false, mobile: false, loggedOut: false, wait: 1200, selector: null, scroll: 0, actions: [] };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--full") opts.full = true;
  else if (a === "--mobile") opts.mobile = true;
  else if (a === "--logged-out") opts.loggedOut = true;
  else if (a === "--wait") opts.wait = Number(args[++i]);
  else if (a === "--selector") opts.selector = args[++i];
  else if (a === "--scroll") opts.scroll = Number(args[++i]);
  else if (a === "--click") opts.actions.push({ kind: "click", selector: args[++i] });
  else if (a === "--fill") opts.actions.push({ kind: "fill", selector: args[++i], text: args[++i] });
  else if (a.startsWith("--")) {
    console.error(`unknown flag ${a}`);
    process.exit(1);
  } else routes.push(a.startsWith("/") ? a : `/${a}`);
}
if (routes.length === 0) routes.push("/");

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("playwright is not installed. Run: npm install && npx playwright install chromium");
  process.exit(1);
}

const baseUrl = await ensureServer({ quiet: true });
const outDir = path.resolve(import.meta.dirname, "..", ".agent", "shots");
mkdirSync(outDir, { recursive: true });

let browser;
try {
  browser = await chromium.launch();
} catch (err) {
  console.error(`${err.message.split("\n")[0]}\nRun: npx playwright install chromium`);
  process.exit(1);
}

const context = await browser.newContext({
  viewport: opts.mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: "dark",
  reducedMotion: "no-preference",
});
if (opts.loggedOut) {
  await context.addCookies([{ name: "dev-auth", value: "off", url: baseUrl }]);
}

let hadProblems = false;
for (const route of routes) {
  const page = await context.newPage();
  const problems = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") problems.push(`console.${msg.type()}: ${msg.text()}`);
  });
  page.on("pageerror", (err) => problems.push(`uncaught: ${err.message}`));
  page.on("response", (res) => {
    if (res.status() >= 400) problems.push(`HTTP ${res.status()}: ${res.url()}`);
  });

  const res = await page.goto(baseUrl + route, { waitUntil: "networkidle", timeout: 90_000 });
  // Hide the Next.js dev badge so it doesn't clutter shots (errors are reported below instead).
  await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
  for (const action of opts.actions) {
    const target = page.locator(action.selector).first();
    try {
      if (action.kind === "click") await target.click({ timeout: 5_000 });
      else await target.fill(action.text, { timeout: 5_000 });
    } catch (err) {
      problems.push(`action failed: --${action.kind} ${action.selector}: ${err.message.split("\n")[0]}`);
    }
  }
  if (opts.scroll) await page.mouse.wheel(0, opts.scroll);
  await page.waitForTimeout(opts.wait);

  const slug = (route === "/" ? "home" : route.slice(1).replace(/[^a-z0-9]+/gi, "-")) + (opts.mobile ? "-mobile" : "");
  const file = path.join(outDir, `${slug}.png`);
  if (opts.selector) await page.locator(opts.selector).first().screenshot({ path: file });
  else await page.screenshot({ path: file, fullPage: opts.full });

  const finalPath = new URL(page.url()).pathname;
  console.log(`\n${route}  ->  HTTP ${res?.status()}${finalPath !== route ? `  (redirected to ${finalPath})` : ""}`);
  console.log(`  screenshot: ${path.relative(process.cwd(), file)}`);
  if (problems.length) {
    hadProblems = true;
    for (const p of [...new Set(problems)]) console.log(`  ! ${p}`);
  } else {
    console.log("  no console errors");
  }
  await page.close();
}

await browser.close();
process.exitCode = hadProblems ? 2 : 0;
