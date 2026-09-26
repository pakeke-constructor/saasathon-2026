import Link from "next/link";
import { ArrowRight, BookOpenText, Database, FileText, Search, ShieldCheck, Wrench } from "lucide-react";

const workflow = [
  { number: "01", icon: Search, title: "Describe the signal", body: "Start with what the operator sees: an error code, a sound, an alert, or a failed part." },
  { number: "02", icon: Database, title: "Search every source", body: "Machine KB checks technical bulletins and the repair history your team has captured." },
  { number: "03", icon: Wrench, title: "Act with context", body: "Get a concise procedure, the source documents behind it, and the safety checks to complete first." },
];

function RegistrationMarks() {
  return <><span className="absolute left-3 top-3 size-4 border-l border-t border-line-strong" /><span className="absolute right-3 top-3 size-4 border-r border-t border-line-strong" /><span className="absolute bottom-3 left-3 size-4 border-b border-l border-line-strong" /><span className="absolute bottom-3 right-3 size-4 border-b border-r border-line-strong" /></>;
}

export default function ContentBlock() {
  return (
    <>
      <section id="system" className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">// 01 / Diagnose</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">From alarm to action, in one workspace.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-fg-muted">Machine KB turns distributed knowledge into a direct answer for the person standing in front of the machine.</p>
            <Link href="/query" className="mt-7 inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent">Open the diagnostic console <ArrowRight className="size-4" strokeWidth={1.5} /></Link>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {workflow.map(({ number, icon: Icon, title, body }) => (
              <article key={number} className="bg-surface p-6 transition-colors hover:bg-surface-2">
                <div className="flex items-center justify-between"><Icon className="size-4 text-fg-muted" strokeWidth={1.5} /><span className="font-mono text-[10px] text-fg-dim">{number}</span></div>
                <h3 className="mt-14 text-base font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-fg-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="knowledge" className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-32">
          <div className="relative overflow-hidden rounded-lg border border-line bg-bg p-5 sm:p-7">
            <RegistrationMarks />
            <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[10px] uppercase tracking-[0.13em]"><span className="text-fg-muted">Knowledge trace / CNC-01</span><span className="text-ok">Resolved</span></div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-md border border-line bg-surface p-4">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-info"><BookOpenText className="size-3.5" strokeWidth={1.5} />Global KB / translated source</div>
                <p className="mt-3 text-sm leading-6 text-fg-muted">Haas VF series service bulletin: inspect the vector drive air intake when ERR 123 follows spindle warm-up.</p>
                <div className="mt-3 inline-flex rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[10px] text-fg-muted">SB 96-018 · PAGE 14</div>
              </div>
              <div className="rounded-md border border-line bg-surface p-4">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-accent"><FileText className="size-3.5" strokeWidth={1.5} />Site note / Acme Precision</div>
                <p className="mt-3 text-sm leading-6 text-fg-muted">CNC-01 intake filter was replaced in May. Keep a spare at crib location B-14 during summer production.</p>
                <div className="mt-3 inline-flex rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[10px] text-fg-muted">ENTERED 14 AUG · J. MORALES</div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted"><ShieldCheck className="size-3.5 text-ok" strokeWidth={1.5} />Answer grounded in 2 verified sources</div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">// 02 / Knowledge network</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Useful on day one. Smarter after every repair.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-fg-muted">Every answer combines the shared technical record for a machine family with the details only your site knows. The result is specific enough to trust at the point of failure.</p>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
              <div className="bg-surface p-4"><dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-info">Global library</dt><dd className="mt-2 text-sm text-fg-muted">Service manuals, bulletins, and documented recurring faults.</dd></div>
              <div className="bg-surface p-4"><dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">Your facility</dt><dd className="mt-2 text-sm text-fg-muted">Machine quirks, repair history, and the notes behind the fixes.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="hero-grid relative overflow-hidden px-5 py-24 lg:px-8 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(255,107,26,0.1),transparent_48%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">[ System ready ]</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">The expert answer is already on site.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-fg-muted">Give every operator a direct path from a machine signal to the right documented procedure.</p>
          <Link href="/query" className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-black transition-[filter,box-shadow] hover:brightness-110 hover:shadow-[0_0_24px_rgba(255,107,26,0.25)]">Enter diagnostics <ArrowRight className="size-4" strokeWidth={1.5} /></Link>
        </div>
      </section>
    </>
  );
}
