import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';

export function UserSearchFiltersSection() {
  return (
    <UsersSectionCard
      title="User Search & Filters"
      instruction="Search users and narrow by role, status, and team."
      className="lg:col-span-4"
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="users-search">Search</Label>
          <Input id="users-search" placeholder="name, email, or team" defaultValue="team:operations" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="users-role">Role</Label>
          <Select defaultValue="all">
            <SelectTrigger id="users-role" className="w-full">
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="analyst">Analyst</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="users-status">Status</Label>
          <Select defaultValue="active">
            <SelectTrigger id="users-status" className="w-full">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="invited">Invited</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="users-team">Team</Label>
          <Select defaultValue="all">
            <SelectTrigger id="users-team" className="w-full">
              <SelectValue placeholder="All teams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All teams</SelectItem>
              <SelectItem value="platform">Platform</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">MFA: required</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">Last active: 7d</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">Region: US</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button size="xs">Apply</Button>
          <Button variant="outline" size="xs">
            Clear
          </Button>
        </div>
      </div>
    </UsersSectionCard>
  );
}
