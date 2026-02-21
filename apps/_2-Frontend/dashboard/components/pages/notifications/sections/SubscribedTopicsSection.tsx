import { Button, cn } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';
import { TOPIC_SUBSCRIPTIONS } from './notificationsData';

export function SubscribedTopicsSection() {
  return (
    <NotificationsSectionCard
      title="Subscribed Topics"
      instruction="Topic-level subscriptions, channel preferences, and mute status."
      className="lg:col-span-6"
    >
      <div className="space-y-2">
        {TOPIC_SUBSCRIPTIONS.map((topic) => (
          <div key={topic.topic} className="rounded-md border p-2.5">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <p className="text-sm font-medium">{topic.topic}</p>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-medium',
                  topic.muted ? 'bg-muted text-muted-foreground' : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                )}
              >
                {topic.muted ? 'Muted' : 'Active'}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Owner: {topic.owner} • Subscribers: {topic.subscribers}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {topic.channels.map((channel) => (
                <span key={`${topic.topic}-${channel}`} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                  {channel}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button size="xs">Manage Topics</Button>
        <Button variant="outline" size="xs">
          Add Topic
        </Button>
      </div>
    </NotificationsSectionCard>
  );
}
