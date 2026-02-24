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
import { AnalyticsSectionCard } from './AnalyticsSectionCard';

export function FiltersPanelSection() {
  return (
    <AnalyticsSectionCard
      title="Filters Panel"
      instruction="Date, segment, and channel controls for analysis queries."
      className="lg:col-span-4"
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="analytics-range">Date Range</Label>
          <Select defaultValue="30d">
            <SelectTrigger id="analytics-range" className="w-full">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="analytics-segment">Segment</Label>
          <Select defaultValue="all">
            <SelectTrigger id="analytics-segment" className="w-full">
              <SelectValue placeholder="Select segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All segments</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="mid-market">Mid-Market</SelectItem>
              <SelectItem value="smb">SMB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="analytics-channel">Channel</Label>
          <Select defaultValue="all">
            <SelectTrigger id="analytics-channel" className="w-full">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All channels</SelectItem>
              <SelectItem value="paid">Paid Search</SelectItem>
              <SelectItem value="organic">Organic</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="direct">Direct</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="analytics-campaign">Campaign</Label>
          <Input id="analytics-campaign" placeholder="campaign:summer-launch" defaultValue="campaign:q2-growth" />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">Geo: NA + EU</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">ARR {'>'} $500k</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">Owner: Growth</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button size="xs">Apply</Button>
          <Button variant="outline" size="xs">
            Save View
          </Button>
        </div>
      </div>
    </AnalyticsSectionCard>
  );
}
