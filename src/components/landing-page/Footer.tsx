import Link from "next/link";
import { ArrowUpRight, Hexagon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-9 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-md border border-line bg-surface-2">
              <Hexagon className="size-4 text-accent" strokeWidth={1.5} />
            </span>
            <span className="font-mono text-xs font-medium tracking-[0.16em]">MACHINE KB</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-fg-muted">Operations knowledge for the machines your business depends on.</p>
        </div>
        <div className="flex flex-col items-start gap-4 sm:items-end">
          <Link href="/query" className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg">
            Open diagnostics
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-dim">© 2026 Machine KB / System nominal</p>
        </div>
      </div>
    </footer>
  );
}
