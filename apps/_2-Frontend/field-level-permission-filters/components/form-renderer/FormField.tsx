'use client';

import { memo } from 'react';
import { TextInput, Select, Textarea, Checkbox, Group, Text, Badge } from '@repo/ui-mantine';
import type { ResolvedField } from '@/lib/form-schema/types';

interface FormFieldProps {
  field: ResolvedField;
  value: unknown;
  error?: string;
  onChange: (value: unknown) => void;
  onBlur: () => void;
}

function FieldLabel({ field }: { field: ResolvedField }) {
  const isReadonly = field.accessLevel === 'readonly';
  const isEditable = field.accessLevel === 'editable';

  return (
    <Group gap={6}>
      <Text size="sm" fw={500} component="span">
        {field.label}
      </Text>
      {isReadonly && (
        <Badge size="xs" color="gray" variant="light" radius="sm">
          Read-only
        </Badge>
      )}
      {field.isRequired && isEditable && (
        <Badge size="xs" color="red" variant="light" radius="sm">
          Required
        </Badge>
      )}
    </Group>
  );
}

export const FormField = memo(function FormField({ field, value, error, onChange, onBlur }: FormFieldProps) {
  const isReadonly = field.accessLevel === 'readonly';

  const sharedProps = {
    label: <FieldLabel field={field} />,
    description: field.description,
    error,
    disabled: isReadonly,
  };

  switch (field.type) {
    case 'text':
    case 'email':
      return (
        <TextInput
          {...sharedProps}
          withAsterisk={field.isRequired && !isReadonly}
          type={field.type}
          placeholder={field.placeholder}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.currentTarget.value)}
          onBlur={onBlur}
        />
      );

    case 'number':
      return (
        <TextInput
          {...sharedProps}
          type="number"
          placeholder={field.placeholder}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.currentTarget.value)}
          onBlur={onBlur}
        />
      );

    case 'textarea':
      return (
        <Textarea
          {...sharedProps}
          placeholder={field.placeholder}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.currentTarget.value)}
          onBlur={onBlur}
          minRows={3}
          autosize
        />
      );

    case 'select':
      return <Select {...sharedProps} placeholder={field.placeholder} data={field.options ?? []} value={(value as string) ?? null} onChange={onChange} onBlur={onBlur} clearable />;

    case 'date':
      return <TextInput {...sharedProps} type="date" value={(value as string) ?? ''} onChange={(e) => onChange(e.currentTarget.value)} onBlur={onBlur} />;

    case 'checkbox':
      return <Checkbox {...sharedProps} checked={(value as boolean) ?? false} onChange={(e) => onChange(e.currentTarget.checked)} onBlur={onBlur} />;

    default:
      return null;
  }
});

