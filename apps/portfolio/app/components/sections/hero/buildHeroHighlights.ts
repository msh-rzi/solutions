import { Blocks, Briefcase, Gauge, Layers3, Rocket, Server, ShieldCheck, Workflow } from 'lucide-react';
import type { HeroHighlightItem } from './types';

export function buildHeroHighlights(highlights: readonly string[]): HeroHighlightItem[] {
  const icons = [ShieldCheck, Layers3, Gauge, Workflow, Server, Rocket, Briefcase, Blocks];

  return highlights
    .map((text, index) => ({
      icon: icons[index % icons.length] ?? ShieldCheck,
      text,
    }))
    .filter((item) => item.text.length > 0);
}
