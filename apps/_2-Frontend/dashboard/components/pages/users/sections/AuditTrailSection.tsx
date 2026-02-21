import { ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent, cn } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';
import { AUDIT_EVENTS, AUDIT_TREND } from './usersData';

export function AuditTrailSection() {
  return (
    <UsersSectionCard
      title="Audit Trail"
      instruction="Chronological user management events with security-relevant changes."
      className="lg:col-span-12"
    >
      <ChartContainer
        className="h-36"
        config={{
          logins: { label: 'Logins', color: '#2563eb' },
          roleChanges: { label: 'Role Changes', color: '#f59e0b' },
          statusUpdates: { label: 'Status Updates', color: '#dc2626' },
        }}
      >
        <ChartPrimitives.ComposedChart data={AUDIT_TREND} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="day" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis tickLine={false} axisLine={false} width={28} allowDecimals={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} events`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="logins" fill="var(--color-logins)" radius={[4, 4, 0, 0]} maxBarSize={22} />
          <ChartPrimitives.Line
            dataKey="roleChanges"
            type="monotone"
            stroke="var(--color-roleChanges)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <ChartPrimitives.Line
            dataKey="statusUpdates"
            type="monotone"
            stroke="var(--color-statusUpdates)"
            strokeWidth={2}
            dot={false}
            strokeDasharray="4 4"
            isAnimationActive={false}
          />
        </ChartPrimitives.ComposedChart>
      </ChartContainer>

      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Time</th>
              <th className="px-3 py-2 font-medium">Actor</th>
              <th className="px-3 py-2 font-medium">Action</th>
              <th className="px-3 py-2 font-medium">Target</th>
              <th className="px-3 py-2 font-medium">Detail</th>
              <th className="px-3 py-2 font-medium">Severity</th>
            </tr>
          </thead>
          <tbody>
            {AUDIT_EVENTS.map((event) => (
              <tr key={`${event.time}-${event.actor}-${event.action}`} className="border-t">
                <td className="px-3 py-2 tabular-nums">{event.time}</td>
                <td className="px-3 py-2">{event.actor}</td>
                <td className="px-3 py-2">{event.action}</td>
                <td className="px-3 py-2">{event.target}</td>
                <td className="px-3 py-2 text-muted-foreground">{event.detail}</td>
                <td className="px-3 py-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-medium',
                      event.severity === 'Info' && 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
                      event.severity === 'Warning' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                      event.severity === 'Critical' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                    )}
                  >
                    {event.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UsersSectionCard>
  );
}
