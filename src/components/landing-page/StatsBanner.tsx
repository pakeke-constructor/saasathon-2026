const stats = [
  { value: "$6,000", label: "Average cost of a stopped line / hr" },
  { value: "2.5 hr", label: "Typical wait for specialist support" },
  { value: "1 answer", label: "Needed to get production moving" },
];

export default function StatsBanner() {
  return (
    <section id="coverage" className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-7 px-5 py-10 sm:grid-cols-3 lg:px-8">
        {stats.map((stat, index) => (
          <div key={stat.label} className={index > 0 ? "sm:border-l sm:border-line sm:pl-7" : ""}>
            <p className="font-mono text-3xl font-medium tracking-tight tabular-nums text-fg">{stat.value}</p>
            <p className="mt-2 max-w-48 text-sm leading-5 text-fg-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
