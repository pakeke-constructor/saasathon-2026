// Idempotent dev-server manager for agents and humans.
//
//   node scripts/dev-server.mjs start    -> ensure `next dev` is running (reuses an existing one)
//   node scripts/dev-server.mjs stop     -> kill the server this script started
//   node scripts/dev-server.mjs status   -> print whether the server is up
//   node scripts/dev-server.mjs logs     -> print the last 80 lines of the server log
//
// The server runs detached, so it survives after this script exits. Output goes to .agent/dev.log.

import { spawn, execSync } from "node:child_process";
import { existsSync, mkdirSync, openSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

export const PORT = Number(process.env.PORT ?? 3000);
export const BASE_URL = `http://localhost:${PORT}`;

const ROOT = path.resolve(import.meta.dirname, "..");
const AGENT_DIR = path.join(ROOT, ".agent");
const LOG_FILE = path.join(AGENT_DIR, "dev.log");
const PID_FILE = path.join(AGENT_DIR, "dev.pid");

export async function isUp() {
  try {
    const res = await fetch(`${BASE_URL}/`, { signal: AbortSignal.timeout(20_000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function isListening() {
  try {
    await fetch(`${BASE_URL}/`, { signal: AbortSignal.timeout(1_500) });
    return true;
  } catch (err) {
    // A timeout means something is listening but slow (e.g. compiling), which counts as up.
    return err?.name === "TimeoutError";
  }
}

export async function ensureServer({ quiet = false } = {}) {
  const log = quiet ? () => {} : (msg) => console.log(msg);

  if (await isListening()) {
    log(`dev server already running at ${BASE_URL}`);
    return BASE_URL;
  }

  mkdirSync(AGENT_DIR, { recursive: true });
  const out = openSync(LOG_FILE, "w");
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "dev", "-p", String(PORT)], {
    cwd: ROOT,
    detached: true,
    stdio: ["ignore", out, out],
    windowsHide: true,
  });
  child.unref();
  writeFileSync(PID_FILE, String(child.pid));
  log(`starting dev server (pid ${child.pid}) -> ${BASE_URL}, log: .agent/dev.log`);

  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    if (await isUp()) {
      log(`dev server ready at ${BASE_URL}`);
      return BASE_URL;
    }
    await new Promise((r) => setTimeout(r, 750));
  }
  console.error(`dev server did not become ready within 90s. Last log lines:\n${tail(40)}`);
  process.exit(1);
}

function tail(n) {
  if (!existsSync(LOG_FILE)) return "(no log yet)";
  return readFileSync(LOG_FILE, "utf8").split("\n").slice(-n).join("\n");
}

function stop() {
  if (!existsSync(PID_FILE)) {
    console.log("no pid file; nothing started by this script (a manually started server is left alone)");
    return;
  }
  const pid = Number(readFileSync(PID_FILE, "utf8"));
  try {
    if (process.platform === "win32") execSync(`taskkill /pid ${pid} /T /F`, { stdio: "ignore" });
    else process.kill(-pid, "SIGTERM");
    console.log(`stopped dev server (pid ${pid})`);
  } catch {
    console.log(`process ${pid} was not running`);
  }
  rmSync(PID_FILE, { force: true });
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename;
if (isMain) {
  const cmd = process.argv[2] ?? "start";
  if (cmd === "start") await ensureServer();
  else if (cmd === "stop") stop();
  else if (cmd === "status") console.log((await isListening()) ? `up at ${BASE_URL}` : "down");
  else if (cmd === "logs") console.log(tail(80));
  else {
    console.error(`unknown command "${cmd}". Use start | stop | status | logs`);
    process.exit(1);
  }
}
