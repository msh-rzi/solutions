import {
  Button,
  ChartContainer,
  ChartPrimitives,
  ChartTooltip,
  ChartTooltipContent,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';
import { PRIORITY_QUEUE } from './notificationsData';

export function FilterTriageSection() {
  return (
    <NotificationsSectionCard
      title="Filter & Triage"
      instruction="Refine queue by priority, type, source, owner, and unread state."
      className="lg:col-span-4"
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="notif-priority">Priority</Label>
          <Select defaultValue="all">
            <SelectTrigger id="notif-priority" className="w-full">
              <SelectValue placeholder="All priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="p1">P1</SelectItem>
              <SelectItem value="p2">P2</SelectItem>
              <SelectItem value="p3">P3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notif-type">Type</Label>
          <Select defaultValue="all">
            <SelectTrigger id="notif-type" className="w-full">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="alert">Alert</SelectItem>
              <SelectItem value="mention">Mention</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="approval">Approval</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notif-assignee">Assignee</Label>
          <Select defaultValue="mine">
            <SelectTrigger id="notif-assignee" className="w-full">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mine">Assigned to me</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="team">My team</SelectItem>
              <SelectItem value="all">All assignees</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notif-search">Search</Label>
          <Input id="notif-search" placeholder="source:billing state:unread" defaultValue="source:workflow" />
        </div>
      </div>

      <Separator />

      <ChartContainer className="h-24" config={{ count: { label: 'Queue', color: '#7c3aed' } }}>
        <ChartPrimitives.BarChart data={PRIORITY_QUEUE} margin={{ top: 4, right: 0, left: -12, bottom: 0 }}>
          <ChartPrimitives.XAxis dataKey="priority" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis hide />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} items`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
        </ChartPrimitives.BarChart>
      </ChartContainer>

      <div className="grid grid-cols-2 gap-2">
        <Button size="xs">Apply</Button>
        <Button variant="outline" size="xs">
          Save View
        </Button>
      </div>
    </NotificationsSectionCard>
  );
}
