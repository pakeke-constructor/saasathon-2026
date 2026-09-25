
<situation>
We are a team participating in a hackathon over this weekend.
The theme is "b2b productivity Saas".

The hackathon lasts 3 days, $25k in prizes. 

By the end of the hackathon, (10am Sunday,) we must have a product deployed on a live domain, and the judges must be able to log in to create an account.

OUR GOAL: Make the frontend look clean and flashy. Make the product feel insanely good. **WE DO NOT NEED THE BACKEND TO BE WORKING PROPERLY.**
From a position of pure pragmatism: We are focusing on making the pitch really good, and we are focusing on making the product LOOK good.
- Having a working product is not important.
- Having a product that looks good, feels good, and can be showcased is *VERY IMPORTANT.*
</situation>


<problem_and_solution>
We are implementing a product that tackles the problem of tribal knowledge in manufacturing companies, and companies with niche machinery.


## PROBLEM:
Manufacturing companies burn billions of dollars per year on unplanned downtime.
A lot of the time, this downtime is due to niche errors with machines:
E.g: "CNC machine-1 warning-light turns red." No one is sure how to fix it except John, who is off-site. The nearest expert is in the city 2.5 hours away. Every hour the machine isn't working, the company is losing $6000.
The on-site engineers frantically search forums, read piles of documentation, search through arcane user-manuals in Chinese, search for exact serial numbers of related machines, etc.
By the time it's fixed, $11000 has been lost.

This problem is all too common in manufacturing shops.

## SOLUTION:
Have a knowledge-base for problems that go wrong with machines.
Categorize knowledge per machine, (and per machine family.)
If something goes wrong: instead of spending hours reading archaic documentation; users just query the LLM directly, and get a response instantly.

Likewise, companies can also add internal notes, or add internal information about their own machines. This allows companies

## HOW DOES THIS WORK?
Have 2 data-stores:
 Local store: Per company information: stores machine quirks specific to that company. E.g: "machine-2's left fan keeps breaking. Suspected instability in the motor? Keep spare fan parts stocked ALWAYS."
- Global store: Per machine type, across the entire industry. E.g: "Abascus-9 machines often stop working when too much debris enters the intake-valve. To fix this, clear the intake-valve, and press the flush-A button twice. Reset the machine, and it should work again"

The reason we have a global-store is because it gives customer value IMMEDIATELY.
The local-store allows our product to build up value over time, and allows us to create a data-moat.

</problem_and_solution>

<product>
We are essentially creating an AI powered "Machine operations knowledge base".

<pragmatic_goal_for_hackathon>
We do NOT want to build a complete product. We want to build something that can be showcased for the hackathon.

- Have a nice landing-page + login-form. (supabase)
- Have a big whitelist of machine-types. Encourage users to select from the whitelist instead of naming their own.
- Have a way to add/register new machines with the company.

IMPORTANT: Choose a couple of manufacturing machines (CNC machines?) that have known issues with them.
To get our "global information" about these machines, we should just find documentation in chinese, (something that's hard to access or generally inaccessible.)
This gives us a great thing to showcase.
</pragmatic_goal_for_hackathon>

</product>

<tech_stack>
- Supabase for auth + DB
- Nextjs + Vercel
- Tailwind + React + Typescript for frontend
- Railway for deployment

(Hardcode everything in the backend, keep it simple, make it look flashy)

<database_schema>
data Organization:
    id: PK
    users: User[]
    machines: Machines[]
    name: String

data Ticket:
    id: PK
    kind: REPAIR | INFO | EVENT
    // the `kind` represents what the ticket was for. Repair = something broke, was fixed. info = random information placed about the machine. When user creates a machine, they are prompted to put in starter-info. An event is something that happens: eg worker notices that the green-light started beeping funny.
    machinePK: PK-reference
    date: DATE
    string: user-description, describes issue

data Machine:
    userSuppliedId: PK  (should reference the name of it in the factory)
    tickets: Tickets[]

data User:
    id: PK
    // ... blah blah, email etc
    name: String
<database_schema>


</tech_stack>



<frontend_style>
# FRONTEND STYLE: "INDUSTRIAL CONTROL ROOM" (non-negotiable, whole product)
Vibe: the HMI screen of an expensive machine, designed by Linear/Vercel. Dark, precise, calm, ONE hot accent: safety orange. Never drift into generic SaaS.

## Colour (tokens already in `src/app/globals.css` `@theme`; always use token names, never raw hex)
- Greys: `bg` page · `surface` cards/sidebar · `surface-2` inputs/hover · `line` ALL 1px borders · `line-strong` hover/focus border · `fg` / `fg-muted` / `fg-dim` text.
- `accent` (orange) + `accent-dim` (10% bg): primary CTA, active state. Precious: ~1 per screen region, rest is greyscale.
- `ok` / `warn` / `fault`: machine status ONLY, never decorative.
- `info` (blue): global-KB / AI-sourced content ONLY. Company/local notes use `accent`.
- Dark mode only. Gradients only: orange radial glow behind hero, `fg`→`fg-muted` on big headlines. No purple, rainbow, pastel.

## Type
- Geist Sans + Geist Mono. Mono heavily: machine IDs, error codes, serials, timestamps, costs, stats, table data (`CNC-01`, `ERR 0x4F2`, `$6,000/hr`), `tabular-nums`.
- Headlines: `font-semibold tracking-tight`, hero `text-6xl md:text-7xl`.
- Eyebrows: mono `text-xs uppercase tracking-[0.15em] text-fg-muted`, e.g. `// 01`, `[ DIAGNOSE ]`.
- Body: `text-sm`/`text-base` `text-fg-muted`, max ~65ch.

## Shape & layout
- Cards: `bg-surface border border-line rounded-lg`. Buttons/inputs `rounded-md`. Borders, not shadows (only exception: orange glow on primary CTA). No `rounded-2xl+` or pill containers.
- Signature details: faint 32px grid background fading at edges (hero, empty states); L-shaped corner crop marks on hero/feature panels.
- Generous space: sections `py-24`+, `max-w-6xl`. Dense data inside panels, air outside.
- App shell: 240px `surface` sidebar + top bar with mono breadcrumb. ⌘K palette feel.

## Components
- Primary button: `bg-accent text-black font-medium`, glow on hover. Secondary: `bg-surface-2 border-line`, hover `border-line-strong`. Ghost: `text-fg-muted hover:text-fg`.
- Inputs: `bg-surface-2 border-line`, focus = `accent` border + `accent-dim` ring.
- Status pill: dot + mono uppercase label (`● RUNNING`); fault dot pulses.
- AI answer: streams token-by-token (fake it) under a mono header like `SOURCE: GLOBAL KB · 3 docs · translated from 中文`, with citation chips.
- Icons: lucide-react only, `size-4 stroke-[1.5]`. No emoji. Re-skin anything default (selects, checkboxes, shadcn).

## Motion (where "flashy" lives)
- framer-motion, 150–400ms, ease `[0.16, 1, 0.3, 1]`, no bouncy springs.
- Entrances: fade + 8px rise, 40–60ms stagger. Numbers count up. Live things tick (timestamps, pulsing dots, hero scan line).
- Hover: border → `line-strong`, no scale-up. Skeletons: 1px-bordered shimmer.

## Copy
Terse, technical, operator voice. Real-looking specifics everywhere (models, error codes, $ figures, timestamps). Never lorem ipsum.

## DO NOT
Light backgrounds, default blue/indigo buttons, glassmorphism, neon cyberpunk, purple AI gradients, sparkle icons, soft shadows, stock illustrations/mascots.
</frontend_style>

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


<agent_workflow>
# AGENT WORKFLOW: SEE THE PAGE, FIX IT, SEE IT AGAIN
Work autonomously. Never ask the human to start the server, log in, or take screenshots.

## Loop: edit → `npm run shot -- <route>` → Read the PNG → fix → repeat
- `npm run dev:bg`: ensure dev server on :3000 (idempotent). Also `dev:status` / `dev:logs` / `dev:stop`. Never run plain `npm run dev` (blocks). Hot-reloads; restart only after `.env*` / `next.config.ts` changes. Page broken/500? Read `dev:logs` first.
- `npm run shot -- /query [/other ...]`: 1440x900 screenshot to `.agent/shots/<route>.png`, prints status + console/network errors. Exit code 2 = page logged errors; fix them. **Always Read the PNG**; never assume it rendered.
  - Flags: `--mobile`, `--full`, `--scroll 1200`, `--wait 3000` (animations/streaming/3D), `--selector main`, `--logged-out`, `--fill <sel> <text>`, `--click <sel>` (Playwright selectors, run in order).
  - e.g. `npm run shot -- /query --fill textarea "ERR 0x4F2" --click "text=Run diagnosis" --wait 4000`
- Claude-in-Chrome also works against localhost:3000 for hover/multi-step flows.

## Auth in dev
- `next dev` auto-logs you in as `DEMO_USER` (Dana Reyes, Kestrel Precision Machining) via `src/lib/auth/session.ts`. Never in prod.
- **All auth checks go through `getSessionUser()` / `requireUser()` from `@/lib/auth/session`.** Never call `supabase.auth.getUser()` directly, or the bypass breaks.
- Opt out: `--logged-out` (cookie `dev-auth=off`) or `DEV_AUTH_BYPASS=0` in `.env.local`.

## Before calling UI work done
- Check desktop AND `--mobile`, and compare against <frontend_style>.
- `npm run check` (tsc + eslint).
- Next.js 16: middleware is `src/proxy.ts`. Unsure about an API? Read `node_modules/next/dist/docs/`.
- Fresh machine: `npm install && npx playwright install chromium`.
</agent_workflow>
