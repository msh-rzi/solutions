import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui-shadcn';
import { useShallow } from 'zustand/react/shallow';
import { DATA_GRID_PAGE_SIZE_OPTIONS, DATA_GRID_SIZE_OPTIONS, useDataGridStore } from '../../store/useDataGridStore';

export const DataSettingsFieldSet = () => {
  const { rowCount, columnCount, pageSize, virtualization, setGridSize, setPageSize } = useDataGridStore(
    useShallow((state) => ({
      rowCount: state.rowCount,
      columnCount: state.columnCount,
      pageSize: state.pageSize,
      virtualization: state.virtualization,
      setGridSize: state.setGridSize,
      setPageSize: state.setPageSize,
    })),
  );
  const selectedGridSize = `${rowCount}:${columnCount}`;

  return (
    <FieldSet>
      <FieldLegend>Data Settings</FieldLegend>
      <FieldGroup className="flex flex-col gap-3 mt-2">
        <Field>
          <FieldLabel htmlFor="gridSize">Grid Size</FieldLabel>
          <Select
            value={selectedGridSize}
            onValueChange={(value) => {
              const [nextRowCount, nextColumnCount] = value.split(':');
              if (!nextRowCount || !nextColumnCount) return;

              setGridSize({
                rowCount: Number(nextRowCount),
                columnCount: Number(nextColumnCount),
              });
            }}
          >
            <SelectTrigger id="gridSize" className="w-full">
              <SelectValue placeholder="Select grid size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {DATA_GRID_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={`${option.rowCount}:${option.columnCount}`} value={`${option.rowCount}:${option.columnCount}`}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="pageSize">Page Size</FieldLabel>
          <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))} disabled={virtualization}>
            <SelectTrigger id="pageSize" className="w-full" disabled={virtualization}>
              <SelectValue placeholder="Select page size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {DATA_GRID_PAGE_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {virtualization ? <FieldDescription>Disabled while virtualization is enabled.</FieldDescription> : null}
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

