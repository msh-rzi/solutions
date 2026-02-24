import { FieldGroup, FieldSet, FieldLegend } from '@repo/ui-shadcn';
import { FeatureToggle } from './FeatureToggle';
import { DATA_GRID_FEATURES } from '../../store/useDataGridStore';

export const FeaturesFieldSet = () => (
  <FieldSet>
    <FieldLegend>Features</FieldLegend>
    <FieldGroup className="flex flex-col gap-1 mt-2">
      {DATA_GRID_FEATURES.map(({ id, label }) => (
        <FeatureToggle key={id} id={id} label={label} />
      ))}
    </FieldGroup>
  </FieldSet>
);
