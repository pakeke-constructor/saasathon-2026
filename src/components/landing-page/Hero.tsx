"use client";

import Link from "next/link";
import { ArrowRight, CircleAlert, FileText, Search, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { CncMachineModel } from "@/components/machine/cnc-machine-model";

const transition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

function RegistrationMarks() {
  return (
    <>
      <span className="absolute left-3 top-3 size-4 border-l border-t border-line-strong" />
      <span className="absolute right-3 top-3 size-4 border-r border-t border-line-strong" />
      <span className="absolute bottom-3 left-3 size-4 border-b border-l border-line-strong" />
      <span className="absolute bottom-3 right-3 size-4 border-b border-r border-line-strong" />
    </>
  );
}

export default function Hero() {
  return (
    <main className="overflow-hidden">
      <section className="hero-grid relative isolate">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_at_62%_36%,rgba(255,107,26,0.12),transparent_48%)]" />
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-28">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <div className="mb-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
              <span className="size-1.5 animate-pulse rounded-full bg-ok" />
              Operations intelligence / online
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.045em] text-fg sm:text-6xl lg:text-7xl lg:leading-[0.98]">
              Keep the line <span className="text-fg-muted">moving.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-fg-muted sm:text-lg">
              Instant machine diagnosis from service records, manufacturer manuals, and the knowledge your team builds on the floor.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/query" className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-black transition-[filter,box-shadow] hover:brightness-110 hover:shadow-[0_0_24px_rgba(255,107,26,0.25)]">
                Diagnose a machine
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
              <a href="#system" className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2.5 text-sm text-fg transition-colors hover:border-line-strong">
                See the system
              </a>
            </div>
            <div className="mt-11 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
              <span>Global technical library</span><span className="text-fg-dim">/</span><span>Site-specific memory</span><span className="text-fg-dim">/</span><span>Operator-ready answers</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.1 }} className="relative mx-auto w-full max-w-[530px]">
            <div className="relative h-[390px] overflow-hidden rounded-lg border border-line bg-surface sm:h-[450px]">
              <RegistrationMarks />
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-line bg-surface/80 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.13em]">
                <span className="text-fg-muted">Machine profile</span>
                <span className="flex items-center gap-1.5 text-ok"><span className="size-1.5 rounded-full bg-ok" />Connected</span>
              </div>
              <CncMachineModel className="absolute inset-x-0 bottom-6 top-9" />
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 border-t border-line bg-surface/90 backdrop-blur-sm">
                <div className="border-r border-line px-5 py-3.5"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">Asset</p><p className="mt-1 font-mono text-xs text-fg">CNC-01 / VF-2SS</p></div>
                <div className="px-5 py-3.5"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">Last event</p><p className="mt-1 font-mono text-xs text-fg">12 min ago</p></div>
              </div>
              <span className="scan-line pointer-events-none absolute inset-x-5 top-12 h-px bg-accent/70" />
            </div>
            <div className="absolute -bottom-7 -left-4 hidden w-[236px] rounded-lg border border-line bg-surface p-3.5 sm:block">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-info"><Search className="size-3.5" strokeWidth={1.5} />Global source match</div>
              <p className="mt-3 text-xs leading-5 text-fg-muted">Vector drive intake obstruction. 3 matching service bulletins found.</p>
            </div>
            <div className="absolute -right-3 top-[38%] hidden rounded-md border border-line bg-surface px-3 py-2.5 sm:flex sm:items-center sm:gap-2"><CircleAlert className="size-3.5 text-warn" strokeWidth={1.5} /><span className="font-mono text-[10px] text-fg-muted">ERR 123</span></div>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-3 border-x border-t border-line bg-surface/40 px-5 lg:px-8">
          {[{ icon: Search, value: "1,284", label: "Global service records" }, { icon: FileText, value: "47", label: "Site notes indexed" }, { icon: Wrench, value: "< 2 min", label: "To a recommended fix" }].map(({ icon: Icon, value, label }, index) => (
            <div key={label} className={`py-5 ${index > 0 ? "border-l border-line pl-4 sm:pl-7" : ""}`}>
              <Icon className="mb-3 size-4 text-fg-muted" strokeWidth={1.5} /><p className="font-mono text-base tabular-nums text-fg sm:text-xl">{value}</p><p className="mt-1 max-w-28 text-[10px] leading-4 text-fg-muted sm:max-w-none sm:text-xs">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
