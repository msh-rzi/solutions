import { Group, Title, Text, Badge } from "@repo/ui-mantine";
import { Shield, Lock } from "lucide-react";

// ─── Component ─────────────────────────────────────────────────────────────────

export function PageHeader() {
  return (
    <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
      <div>
        <Title order={1} size="h2" lh={1.2}>
          Form Permissions & Filters
        </Title>
        <Text c="dimmed" size="sm" mt="xs">
          Enterprise-grade field-level authorization and server-side filtering
        </Text>
      </div>
      <Group gap="xs">
        <Badge
          leftSection={<Shield size={13} />}
          size="lg"
          variant="light"
          radius="sm"
        >
          Schema-Driven
        </Badge>
        <Badge
          leftSection={<Lock size={13} />}
          size="lg"
          variant="light"
          color="green"
          radius="sm"
        >
          Server-Filtered
        </Badge>
      </Group>
    </Group>
  );
}
