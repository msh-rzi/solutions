type AboutFocusListProps = {
  items: readonly string[];
  title: string;
};

export function AboutFocusList({ items, title }: AboutFocusListProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-ambient">
      <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">{title}</p>
      <ul className="mt-4 space-y-3 text-sm text-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
