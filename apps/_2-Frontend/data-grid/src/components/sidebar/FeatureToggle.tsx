import { Checkbox, Field, Label } from '@repo/ui-shadcn';
import { useShallow } from 'zustand/react/shallow';
import { useDataGridStore, type DataGridFeatureId } from '../../store/useDataGridStore';

interface FeatureToggleProps {
  id: DataGridFeatureId;
  label: string;
}

export const FeatureToggle = ({ id, label }: FeatureToggleProps) => {
  const { checked, setFeatureEnabled } = useDataGridStore(
    useShallow((state) => ({
      checked: state[id],
      setFeatureEnabled: state.setFeatureEnabled,
    })),
  );

  return (
    <Field orientation="horizontal" className="items-center justify-between py-1">
      <Label htmlFor={id}>{label}</Label>
      <Checkbox id={id} checked={checked} onCheckedChange={(nextState) => setFeatureEnabled(id, nextState === true)} />
    </Field>
  );
};
