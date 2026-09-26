import Link from "next/link";
import { ArrowUpRight, Hexagon } from "lucide-react";

const navigation = [
  { label: "How it works", href: "#system" },
  { label: "Knowledge network", href: "#knowledge" },
  { label: "Coverage", href: "#coverage" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Machine KB home">
          <span className="grid size-7 place-items-center rounded-md border border-line bg-surface transition-colors group-hover:border-line-strong">
            <Hexagon className="size-4 text-accent" strokeWidth={1.5} />
          </span>
          <span className="font-mono text-xs font-medium tracking-[0.16em] text-fg">
            MACHINE KB
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/query" className="hidden px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg sm:inline-flex">
            Log in
          </Link>
          <Link href="/query" className="inline-flex items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-black transition-[filter,box-shadow] hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,107,26,0.22)]">
            Open workspace
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
