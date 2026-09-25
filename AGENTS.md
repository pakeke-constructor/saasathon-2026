
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
# FRONTEND STYLE: "INDUSTRIAL CONTROL ROOM"
This is the single, non-negotiable visual style for the whole product (landing page, auth, and app).
Do not invent a new style. Do not "improve" it into a generic SaaS look. If unsure, re-read this section.

The vibe: the HMI screen of a very expensive machine, designed by Linear/Vercel.
Dark, precise, technical, calm, with ONE hot accent colour: safety orange. Think machine-shop signage, hazard tape, CNC readouts, oscilloscopes.

## Theme
- DARK MODE ONLY. No light mode. No theme toggle.
- Page background is near-black graphite, never pure #000, never blue-tinted navy.

## Colour tokens (define once in `globals.css` via Tailwind `@theme`, use the token names everywhere)
| token            | hex       | use |
|------------------|-----------|-----|
| `bg`             | `#0A0A0B` | page background |
| `surface`        | `#111113` | cards, panels, sidebar |
| `surface-2`      | `#18181B` | hover / raised / inputs |
| `line`           | `#26262B` | ALL borders and dividers (1px) |
| `line-strong`    | `#3A3A40` | focused / hovered borders |
| `fg`             | `#EDEDEF` | primary text |
| `fg-muted`       | `#8A8A93` | secondary text, labels |
| `fg-dim`         | `#55555C` | placeholders, disabled, grid lines |
| `accent`         | `#FF6B1A` | THE brand colour: primary buttons, active states, key highlights |
| `accent-dim`     | `#FF6B1A1A` | accent backgrounds (10% alpha) |
| `ok`             | `#3DDC97` | machine RUNNING / resolved |
| `warn`           | `#FFC53D` | machine WARNING / degraded |
| `fault`          | `#FF4D4F` | machine DOWN / error |
| `info`           | `#5B9DFF` | global-knowledge / AI-sourced info ONLY |

Rules:
- Orange is precious. Max ~1 primary orange element per screen region. Everything else is greyscale.
- Status colours (`ok`/`warn`/`fault`) are ONLY for machine/system status. Never decorative.
- No purple. No gradients-of-many-colours. No rainbow. No pastel.
- The only gradients allowed: a subtle orange radial glow behind hero content, and `fg` → `fg-muted` on large headline text.

## Typography
- Sans: **Geist Sans** (`next/font` / `geist` package). Mono: **Geist Mono**.
- Mono is used heavily and deliberately: machine IDs, serial numbers, error codes, timestamps, stats, costs, section eyebrows, keyboard hints, table data. e.g. `CNC-01`, `ERR 0x4F2`, `$6,000/hr`.
- Headlines: sans, `font-semibold`, tight tracking (`tracking-tight` / `-0.02em`), large. Hero ~`text-6xl md:text-7xl`.
- Eyebrows / section labels: mono, `text-xs uppercase tracking-[0.15em] text-fg-muted`, often prefixed with a marker like `// 01` or `[ DIAGNOSE ]`.
- Body: `text-sm` or `text-base`, `text-fg-muted`, max ~65ch. Numbers use `tabular-nums`.

## Shape & layout
- Borders over shadows. Every card/panel is `bg-surface border border-line`. No drop shadows except the orange glow on the primary CTA.
- Radius: small and crisp. `rounded-md` (6px) for buttons/inputs, `rounded-lg` (8px) for cards. NEVER `rounded-2xl`/`rounded-full` pills on containers (only on status dots and avatars).
- Background texture: faint 1px grid (`line` colour at low opacity, ~32px cells), masked to fade out at edges. Use on hero and empty states.
- Corner "registration marks" / crop marks on hero cards and feature panels are encouraged (small L-shaped 1px lines at corners). This is our signature detail.
- Spacing is generous: sections `py-24`+, content max width `max-w-6xl`. Dense data inside panels, lots of air outside them.
- App layout: left sidebar (`surface`, 240px) + top bar with a mono breadcrumb + main content. Command palette (⌘K) feel.

## Components
- **Primary button**: `bg-accent text-black font-medium rounded-md`, subtle orange glow on hover. Black text on orange, not white.
- **Secondary button**: `bg-surface-2 border border-line text-fg`, hover `border-line-strong`.
- **Ghost button**: text only, `text-fg-muted hover:text-fg`.
- **Inputs**: `bg-surface-2 border-line`, focus ring = 1px `accent` border + `accent-dim` ring. Mono for any ID/serial input.
- **Status pill**: small dot + mono uppercase label, e.g. `● RUNNING` (`ok`), `● FAULT` (`fault`, dot pulses).
- **Machine card**: mono machine ID top-left, status pill top-right, model name, family, last-incident line in `fg-muted`.
- **AI answer**: streams in token-by-token (fake it if needed) in a panel with a mono header like `SOURCE: GLOBAL KB · 3 docs · translated from 中文`. Sources shown as citation chips. Global-KB content tagged `info` blue, company/local notes tagged `accent` orange.
- **Kbd hints**: `<kbd>` styled mono, `border-line bg-surface-2 text-xs`.
- Icons: **lucide-react** only, `size-4`, `stroke-[1.5]`. No emoji in UI.

## Motion ("flashy" lives here — tasteful, fast, purposeful)
- Use **framer-motion** (`motion`). Durations 150–400ms, ease `[0.16, 1, 0.3, 1]`. No bouncy springs.
- Page/section entrance: fade + 8px rise, staggered children (40–60ms).
- Numbers count up (downtime cost, hours saved). Live-feeling things tick: timestamps, a pulsing status dot, a scanning line across the hero.
- Typewriter/streaming text for AI output. Skeletons are 1px-bordered shimmer blocks, not grey blobs.
- Hover: border brightens to `line-strong`, maybe a 1px accent top-edge. No scale-up zooms on cards.

## Copy tone
- Terse, confident, technical. Short sentences. Operators, not marketers.
- Use real-looking specifics everywhere: machine models, error codes, dollar figures, timestamps. Never "Lorem ipsum", never "Feature 1".

## DO NOT
- No light backgrounds, white cards, or default Tailwind blue/indigo buttons.
- No glassmorphism blur soup, no neon cyberpunk, no purple AI gradients, no sparkle ✨ icons.
- No big soft shadows, no pill-shaped cards, no rounded-3xl.
- No stock illustrations or cartoon mascots. Visuals = UI mockups, 3D machine renders, data, grids.
- No unstyled default components (raw `<select>`, browser-default checkboxes). If you use shadcn/ui, re-skin to these tokens.
</frontend_style>
