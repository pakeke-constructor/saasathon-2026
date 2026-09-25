"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUp,
  BookOpenText,
  ChevronDown,
  CircleStop,
  Factory,
  FileText,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const machines = [
  { id: "CNC-01", model: "Haas VF-2SS", status: "FAULT", color: "bg-fault" },
  { id: "CNC-04", model: "Haas VF-4", status: "RUNNING", color: "bg-ok" },
  { id: "LATHE-02", model: "Doosan PUMA 2600", status: "WARNING", color: "bg-warn" },
];

const promptSuggestions = [
  "Spindle load spikes above 130% during tool changes",
  "ERR 123: spindle drive fault after warm-up",
  "Intermittent red warning light on lubrication panel",
];

const answer = {
  diagnosis:
    "ERR 123 on the Haas VF-2SS commonly indicates spindle drive overload caused by restricted airflow at the vector drive intake. Service bulletin 96-018 documents debris accumulation behind the cabinet filter as the primary cause.",
  steps: [
    "Engage E-stop and isolate main power before opening the electrical cabinet.",
    "Remove and inspect the vector drive intake filter. Clear metal fines with dry compressed air.",
    "Verify fan rotation is unobstructed, reseat connector P17, then restore power.",
    "Run spindle warm-up program O02020 and confirm load remains below 80%.",
  ],
};

export function QueryConsole() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;

    setSubmittedQuery("");
    setIsSearching(true);
    window.setTimeout(() => {
      setSubmittedQuery(value);
      setIsSearching(false);
    }, 650);
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="flex h-14 items-center justify-between border-b border-line px-5 md:px-8">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em]">
          <span className="text-fg-muted">Acme Precision</span>
          <span className="text-fg-dim">/</span>
          <span>Diagnose</span>
        </div>
        <div className="hidden items-center gap-2 font-mono text-[11px] text-fg-muted sm:flex">
          <span className="size-1.5 rounded-full bg-ok" />
          GLOBAL KB ONLINE
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8 lg:py-16">
        <section>
          <div className="mb-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
              {"// Machine diagnostics"}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              What went wrong?
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-fg-muted">
              Describe symptoms, warning lights, or an error code. We search global
              service knowledge and your site&apos;s maintenance history.
            </p>
          </div>

          <form onSubmit={submit} className="rounded-lg border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <button
                type="button"
                className="flex items-center gap-2 font-mono text-xs text-fg"
              >
                <Factory className="size-4 text-fg-muted" strokeWidth={1.5} />
                CNC-01 · HAAS VF-2SS
                <ChevronDown className="size-3.5 text-fg-muted" strokeWidth={1.5} />
              </button>
              <span className="flex items-center gap-2 font-mono text-[10px] text-fault">
                <span className="size-1.5 animate-pulse rounded-full bg-fault" />
                FAULT
              </span>
            </div>
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              rows={5}
              placeholder="e.g. ERR 123 appears after spindle warm-up. Cabinet fan sounds obstructed..."
              className="w-full resize-none bg-transparent px-4 py-4 text-base leading-7 text-fg outline-none placeholder:text-fg-dim"
            />
            <div className="flex items-center justify-between border-t border-line px-3 py-3">
              <span className="hidden font-mono text-[10px] text-fg-dim sm:block">
                INCLUDE ERROR CODE + OBSERVED SYMPTOMS
              </span>
              <button
                type="submit"
                disabled={!query.trim() || isSearching}
                className="ml-auto flex items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-black transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSearching ? "Searching" : "Run diagnosis"}
                {isSearching ? (
                  <CircleStop className="size-4" strokeWidth={1.5} />
                ) : (
                  <ArrowUp className="size-4" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </form>

          {!submittedQuery && !isSearching && (
            <div className="mt-5 grid gap-2">
              {promptSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuery(suggestion)}
                  className="flex items-center gap-3 rounded-md border border-line px-3.5 py-3 text-left text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <Search className="size-3.5 shrink-0" strokeWidth={1.5} />
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {isSearching && (
              <motion.div
                key="searching"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 overflow-hidden rounded-lg border border-line bg-surface"
              >
                <div className="h-px animate-pulse bg-accent" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-44 animate-pulse bg-surface-2" />
                  <div className="h-3 w-full animate-pulse bg-surface-2" />
                  <div className="h-3 w-4/5 animate-pulse bg-surface-2" />
                </div>
              </motion.div>
            )}

            {submittedQuery && (
              <motion.article
                key={submittedQuery}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 overflow-hidden rounded-lg border border-line bg-surface"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em]">
                  <span className="text-info">Source: Global KB · 3 docs</span>
                  <span className="text-fg-muted">Translated from 中文</span>
                </div>
                <div className="p-5 md:p-6">
                  <p className="mb-2 font-mono text-xs text-fg-muted">
                    QUERY: {submittedQuery}
                  </p>
                  <h2 className="mt-6 text-lg font-semibold">Probable cause</h2>
                  <p className="mt-3 text-sm leading-7 text-fg-muted">
                    {answer.diagnosis}
                  </p>
                  <h2 className="mt-7 text-lg font-semibold">Recommended procedure</h2>
                  <ol className="mt-3 space-y-3">
                    {answer.steps.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm leading-6 text-fg-muted">
                        <span className="font-mono text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {["SB 96-018", "VF SERIES · 2024", "SITE NOTE · 14 AUG"].map(
                      (source) => (
                        <span
                          key={source}
                          className="rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-[10px] text-fg-muted"
                        >
                          {source}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </section>

        <aside className="space-y-6">
          <section>
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-muted">
              Factory machines
            </h2>
            <div className="overflow-hidden rounded-lg border border-line bg-surface">
              {machines.map((machine, index) => (
                <button
                  key={machine.id}
                  type="button"
                  className={`w-full px-4 py-3.5 text-left transition-colors hover:bg-surface-2 ${
                    index > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span>{machine.id}</span>
                    <span className="flex items-center gap-1.5 text-[9px] text-fg-muted">
                      <span className={`size-1.5 rounded-full ${machine.color}`} />
                      {machine.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-fg-muted">{machine.model}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-line bg-surface p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BookOpenText className="size-4 text-info" strokeWidth={1.5} />
              Knowledge coverage
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-line pt-4">
              <div>
                <dt className="font-mono text-[9px] uppercase text-fg-muted">Global</dt>
                <dd className="mt-1 font-mono text-lg tabular-nums">1,284</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase text-fg-muted">Local</dt>
                <dd className="mt-1 font-mono text-lg tabular-nums">47</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-lg border border-line bg-surface p-4 text-xs leading-5 text-fg-muted">
            <FileText className="mb-3 size-4" strokeWidth={1.5} />
            Verify isolation procedures against your facility&apos;s safety policy before
            servicing equipment.
          </section>
        </aside>
      </main>
    </div>
  );
}
