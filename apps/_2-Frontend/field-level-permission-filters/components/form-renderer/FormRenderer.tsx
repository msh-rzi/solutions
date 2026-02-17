'use client';

import { useForm } from '@tanstack/react-form';
import { Button, Stack, Divider, Text } from '@repo/ui-mantine';
import { FormField } from './FormField';
import type { ResolvedField } from '@/lib/form-schema/types';
import type { SubmitFormResult } from '@/app/actions/form-actions';

interface FormRendererProps {
  fields: ResolvedField[];
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<SubmitFormResult>;
  isPending?: boolean;
}

export function FormRenderer({ fields, initialData = {}, onSubmit, isPending = false }: FormRendererProps) {
  const visibleFields = fields.filter((f) => f.isVisible && f.accessLevel !== 'hidden');

  const defaultValues = visibleFields.reduce<Record<string, unknown>>((acc, field) => {
    acc[field.id] = initialData[field.id] ?? field.defaultValue ?? '';
    return acc;
  }, {});

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const result = await onSubmit(value);

      // Propagate server-side validation errors into field state
      if (result?.validationErrors) {
        Object.entries(result.validationErrors).forEach(([fieldId, error]) => {
          form.setFieldMeta(fieldId, (prev) => ({
            ...prev,
            errors: [error],
          }));
        });
      }

      return result;
    },
  });

  const editableFields = visibleFields.filter((f) => f.accessLevel === 'editable');
  const readonlyFields = visibleFields.filter((f) => f.accessLevel === 'readonly');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Stack gap="lg">
        {/* Editable fields */}
        {editableFields.length > 0 && (
          <Stack gap="md">
            {editableFields.map((field) => (
              <form.Field
                key={field.id}
                name={field.id}
                validators={{
                  onChange: ({ value }) => {
                    if (field.isRequired && !value) return `${field.label} is required`;
                    return undefined;
                  },
                }}
              >
                {(fieldApi) => (
                  <FormField
                    field={field}
                    value={fieldApi.state.value}
                    error={fieldApi.state.meta.errors?.[0] as string | undefined}
                    onChange={fieldApi.handleChange}
                    onBlur={fieldApi.handleBlur}
                  />
                )}
              </form.Field>
            ))}
          </Stack>
        )}

        {/* Read-only fields */}
        {readonlyFields.length > 0 && (
          <>
            {editableFields.length > 0 && <Divider label="Read-only fields" labelPosition="left" />}
            <Stack gap="md">
              {readonlyFields.map((field) => (
                <form.Field key={field.id} name={field.id}>
                  {(fieldApi) => (
                    <FormField
                      field={field}
                      value={fieldApi.state.value}
                      error={fieldApi.state.meta.errors?.[0] as string | undefined}
                      onChange={fieldApi.handleChange}
                      onBlur={fieldApi.handleBlur}
                    />
                  )}
                </form.Field>
              ))}
            </Stack>
          </>
        )}

        {visibleFields.length === 0 && (
          <Text size="sm" c="dimmed" ta="center" py="xl">
            No fields visible for your current role.
          </Text>
        )}

        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({ canSubmit, isSubmitting }) => (
            <Button type="submit" disabled={!canSubmit} loading={isSubmitting || isPending} fullWidth size="md" mt="xs">
              {isSubmitting || isPending ? 'Saving…' : 'Save Changes'}
            </Button>
          )}
        </form.Subscribe>
      </Stack>
    </form>
  );
}

