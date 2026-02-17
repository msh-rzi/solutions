'use client';

import { memo } from 'react';
import { Card, Stack, Group, Text, Badge, Code, Accordion, ThemeIcon } from '@repo/ui-mantine';
import { Eye, Pencil, Lock, EyeOff, ShieldCheck } from 'lucide-react';
import type { FieldsByAccess, UserRole } from '@/lib/form-schema/types';

interface PermissionStatsProps {
  role: UserRole;
  fieldsByAccess: FieldsByAccess;
}

function StatRow({ icon, label, count, color }: { icon: React.ReactNode; label: string; count: number; color: string }) {
  return (
    <Group justify="space-between" wrap="nowrap">
      <Group gap={8} wrap="nowrap">
        <ThemeIcon size="xs" color={color} variant="light" radius="sm">
          {icon}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
      <Badge variant="light" color={color} size="sm">
        {count}
      </Badge>
    </Group>
  );
}

const ROLE_CAPABILITIES: Record<UserRole, { can: string[]; cannot: string[] }> = {
  employee: {
    can: ['Edit personal information', 'View department & title'],
    cannot: ['Change department', 'View salary', 'View SSN', 'Deactivate account'],
  },
  manager: {
    can: ['Edit all employee info', 'Change department', 'View salary (read-only)'],
    cannot: ['View SSN', 'Edit salary', 'Deactivate account'],
  },
  admin: {
    can: ['Full field access', 'Edit salary', 'View & edit SSN', 'Deactivate accounts'],
    cannot: [],
  },
};

export const PermissionStats = memo(function PermissionStats({ role, fieldsByAccess }: PermissionStatsProps) {
  const caps = ROLE_CAPABILITIES[role];

  return (
    <Stack gap="md">
      {/* Stats Card */}
      <Card shadow="sm" padding="lg" withBorder>
        <Group justify="space-between" mb="md">
          <Text fw={600} size="sm">
            Field Access
          </Text>
          <Badge radius="sm" variant="filled" size="sm">
            {role.toUpperCase()}
          </Badge>
        </Group>

        <Stack gap={10}>
          <StatRow icon={<Eye size={12} />} label="Visible" count={fieldsByAccess.visible.length} color="blue" />
          <StatRow icon={<Pencil size={12} />} label="Editable" count={fieldsByAccess.editable.length} color="green" />
          <StatRow icon={<Lock size={12} />} label="Read-only" count={fieldsByAccess.readonly.length} color="orange" />
          <StatRow icon={<EyeOff size={12} />} label="Hidden" count={fieldsByAccess.hidden.length} color="red" />
        </Stack>
      </Card>

      {/* Capabilities Card */}
      <Card shadow="sm" padding="lg" withBorder>
        <Group gap={6} mb="md">
          <ShieldCheck size={14} />
          <Text fw={600} size="sm">
            Capabilities
          </Text>
        </Group>

        <Stack gap={6}>
          {caps.can.map((item) => (
            <Text key={item} size="xs" c="teal">
              ✓ {item}
            </Text>
          ))}
          {caps.cannot.map((item) => (
            <Text key={item} size="xs" c="dimmed">
              ✗ {item}
            </Text>
          ))}
        </Stack>
      </Card>

      {/* Hidden Fields Accordion */}
      <Accordion variant="contained" radius="md">
        <Accordion.Item value="hidden">
          <Accordion.Control>
            <Text size="sm">Hidden fields ({fieldsByAccess.hidden.length})</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack gap={6}>
              {fieldsByAccess.hidden.length > 0 ? (
                fieldsByAccess.hidden.map((f) => (
                  <Code key={f.id} block>
                    {f.id}
                  </Code>
                ))
              ) : (
                <Text size="xs" c="dimmed">
                  All fields visible for this role.
                </Text>
              )}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
});

