import { Button } from '@repo/ui-shadcn';
import type { ContactLink } from './types';

type ContactSocialLinkProps = {
  link: ContactLink;
};

export function ContactSocialLink({ link }: ContactSocialLinkProps) {
  return (
    <Button asChild variant="outline" className="h-auto w-full justify-start gap-4 rounded-2xl border-border/60 bg-background/40 px-4 py-3 text-sm text-muted-foreground hover:-translate-y-0.5 hover:text-foreground hover:shadow-ambient">
      <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}>
        <link.icon size={18} className="text-primary" />
        <span>{link.label}</span>
      </a>
    </Button>
  );
}
