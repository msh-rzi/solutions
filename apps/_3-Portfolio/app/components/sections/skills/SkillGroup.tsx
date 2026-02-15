import { Code2 } from 'lucide-react';
import { Button } from '@repo/ui-shadcn';

type SkillGroupProps = {
  caption: string;
  items: readonly string[];
  title: string;
};

export function SkillGroup({ caption, items, title }: SkillGroupProps) {
  return (
    <article className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Code2 size={16} className="text-primary" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Button key={item} type="button" variant="outline" size="sm" className="pointer-events-none border-border/60 bg-background/40 text-foreground">
            {item}
          </Button>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{caption}</p>
    </article>
  );
}
