'use client';

import { useState, useEffect, useMemo } from 'react';
import { Container, Stack, Grid, Paper, Title, Text } from '@repo/ui-mantine';

import { PageHeader } from '@/components/PageHeader';
import { ArchitectureHighlights } from '@/components/ArchitectureHighlights';
import { FormRenderer, PermissionStats, RoleSelector } from '@/components/form-renderer';

import { useFormPermissions } from '@/hooks/useFormPermissions';
import { useFormSubmit } from '@/hooks/useFormSubmit';

import { employeeFormSchema } from '@/lib/form-schema/schemas';
import { permissionResolver } from '@/lib/form-schema/resolver';
import { getFormData } from '@/app/actions/form-actions';
import type { UserRole, RequestContext } from '@/lib/form-schema/types';

export default function Home() {
  const [role, setRole] = useState<UserRole>('employee');
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  // Load pre-populated data once on mount
  useEffect(() => {
    getFormData('user-123').then(({ data }) => setFormData(data));
  }, []);

  // Memoised request context — only recalculates when role changes
  const context: RequestContext = useMemo(
    () => ({
      formContext: 'edit',
      user: { role, userId: 'user-123', departmentId: 'eng-001' },
    }),
    [role],
  );

  // Resolved field access breakdown (memoised inside the hook)
  const fieldsByAccess = useFormPermissions(employeeFormSchema.fields, context);

  // All resolved fields for the FormRenderer
  const resolvedFields = useMemo(() => permissionResolver.resolveFields(employeeFormSchema.fields, context), [context]);

  // Form submission with integrated toast notifications
  const { handleSubmit, isPending } = useFormSubmit({
    formId: employeeFormSchema.id,
    context,
  });

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* ── Header ── */}
        <PageHeader />

        {/* ── Role Switcher ── */}
        <RoleSelector value={role} onChange={setRole} />

        {/* ── Main Content ── */}
        <Grid gutter="lg">
          {/* Form Column */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper shadow="sm" p="xl" withBorder>
              <Title order={3} size="h4" mb={4}>
                {employeeFormSchema.name}
              </Title>
              <Text size="sm" c="dimmed" mb="xl">
                {employeeFormSchema.description}
              </Text>

              <FormRenderer fields={resolvedFields} initialData={formData} onSubmit={handleSubmit} isPending={isPending} />
            </Paper>
          </Grid.Col>

          {/* Sidebar Column */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <PermissionStats role={role} fieldsByAccess={fieldsByAccess} />
          </Grid.Col>
        </Grid>

        {/* ── Architecture Info ── */}
        <ArchitectureHighlights />
      </Stack>
    </Container>
  );
}

