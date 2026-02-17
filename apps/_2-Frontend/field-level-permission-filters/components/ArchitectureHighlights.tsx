import { Paper, Title, Grid, Card, Text } from "@repo/ui-mantine";

// ─── Data ──────────────────────────────────────────────────────────────────────

const HIGHLIGHTS = [
  {
    title: "Declarative Schema",
    description:
      "Fields, permissions, and validation defined in a single typed object",
  },
  {
    title: "Permission Resolver",
    description:
      "Dynamic field access computed from role + context at render time",
  },
  {
    title: "Server-Side Filter",
    description:
      "All submissions validated and RBAC-filtered on the server — never trust the client",
  },
  {
    title: "Single Source of Truth",
    description: "Same schema drives rendering, authorization, and validation",
  },
] as const;

// ─── Component ─────────────────────────────────────────────────────────────────

export function ArchitectureHighlights() {
  return (
    <Paper shadow="sm" p="xl" withBorder>
      <Title order={3} size="h5" mb="lg">
        Architecture Highlights
      </Title>
      <Grid gutter="md">
        {HIGHLIGHTS.map(({ title, description }) => (
          <Grid.Col key={title} span={{ base: 12, sm: 6, lg: 3 }}>
            <Card padding="md" withBorder h="100%">
              <Text fw={600} size="sm" mb="xs">
                {title}
              </Text>
              <Text size="xs" c="dimmed">
                {description}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Paper>
  );
}
