import React from 'react';

type UsersSectionCardProps = {
  title: string;
  instruction: string;
  className?: string;
  children: React.ReactNode;
};

export function UsersSectionCard({ title, instruction, className, children }: UsersSectionCardProps) {
  return (
    <article className={`rounded-lg border bg-card p-4 ${className ?? ''}`}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{instruction}</p>
      <div className="mt-4 space-y-2">{children}</div>
    </article>
  );
}
