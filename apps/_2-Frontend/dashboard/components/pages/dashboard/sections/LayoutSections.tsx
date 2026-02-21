import { AnalystSections } from './AnalystSections';
import { ExecutiveSections } from './ExecutiveSections';
import { OperationsSections } from './OperationsSections';

export type DashboardLayoutPreset = 'executive' | 'operations' | 'analyst';

type LayoutSectionsProps = {
  layout: DashboardLayoutPreset;
};

export function LayoutSections({ layout }: LayoutSectionsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {layout === 'operations' && <OperationsSections />}
      {layout === 'analyst' && <AnalystSections />}
      {layout === 'executive' && <ExecutiveSections />}
    </div>
  );
}

