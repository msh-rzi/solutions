"use client";

import { memo } from "react";
import { Paper, Group, Text, SegmentedControl } from "@repo/ui-mantine";
import type { UserRole } from "@/lib/form-schema/types";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const ROLE_OPTIONS = [
  { label: "Employee", value: "employee" },
  { label: "Manager", value: "manager" },
  { label: "Admin", value: "admin" },
] satisfies { label: string; value: UserRole }[];

// ─── Component ─────────────────────────────────────────────────────────────────

export const RoleSelector = memo(function RoleSelector({
  value,
  onChange,
}: RoleSelectorProps) {
  return (
    <Paper shadow="sm" p="md" withBorder>
      <Group justify="space-between" align="center" wrap="wrap" gap="md">
        <div>
          <Text size="sm" fw={600} mb={2}>
            Simulate Role
          </Text>
          <Text size="xs" c="dimmed">
            Each role sees different fields with different access levels
          </Text>
        </div>
        <SegmentedControl
          value={value}
          onChange={(v) => onChange(v as UserRole)}
          data={ROLE_OPTIONS}
          size="md"
          radius="md"
        />
      </Group>
    </Paper>
  );
});
