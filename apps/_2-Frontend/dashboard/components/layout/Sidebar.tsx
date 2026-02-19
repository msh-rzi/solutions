'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BarChart2, Bell, Bookmark, LayoutDashboard, LogOut, Settings as SettingsIcon, Users } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui-shadcn';
import { authClient, switchOrganization, type DemoAuthSession } from '../../lib/auth-client';
import Settings from '../pages/dashboard/Settings';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Analytics', icon: BarChart2, href: '/analytics' },
  { label: 'Users', icon: Users, href: '/users' },
  { label: 'Bookmarks', icon: Bookmark, href: '/bookmarks' },
  { label: 'Notifications', icon: Bell, href: '/notifications' },
];

function AppSidebar() {
  const router = useRouter();
  const { data: session, refetch } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const [isSwitchingOrganization, setIsSwitchingOrganization] = React.useState(false);
  const [switchError, setSwitchError] = React.useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const bottomItems = [{ label: 'Settings', icon: SettingsIcon, onClick: setSettingsOpen, href: undefined }];

  const userName = demoSession?.user?.name ?? 'User';
  const userEmail = demoSession?.user?.email ?? 'user@example.com';
  const organizations = demoSession?.organizations ?? [];
  const activeOrganization = demoSession?.organization ?? demoSession?.tenant;
  const activeOrganizationName = activeOrganization?.name ?? 'Organization';
  const activeOrganizationSlug = activeOrganization?.slug ?? 'organization';

  const fallback =
    userName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || 'U';

  const onSignOut = async () => {
    setIsSigningOut(true);

    try {
      await authClient.signOut();
      router.replace('/login');
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  const onSwitchOrganization = async (organizationId: string) => {
    if (!organizationId || organizationId === activeOrganization?.id) {
      return;
    }

    setSwitchError(null);
    setIsSwitchingOrganization(true);

    try {
      const result = await switchOrganization(organizationId);
      if (result.error) {
        setSwitchError(result.error.message ?? 'Organization switch failed.');
        return;
      }

      await refetch();
      router.refresh();
    } finally {
      setIsSwitchingOrganization(false);
    }
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader className="border-b px-4 py-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
                {activeOrganizationName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm tracking-tight">{activeOrganizationName}</span>
                <span className="text-[11px] text-muted-foreground">{activeOrganizationSlug}</span>
              </div>
            </div>

            <div>
              <label htmlFor="organization-switcher" className="mb-1 block text-[11px] uppercase tracking-wide text-muted-foreground">
                Organization
              </label>
              <select
                id="organization-switcher"
                className="h-8 w-full rounded-md border bg-background px-2 text-xs"
                value={activeOrganization?.id ?? ''}
                onChange={(event) => void onSwitchOrganization(event.target.value)}
                disabled={isSwitchingOrganization || organizations.length <= 1}
              >
                {organizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>
                    {organization.name}
                  </option>
                ))}
              </select>
              {switchError && <p className="mt-1 text-[11px] text-destructive">{switchError}</p>}
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <SidebarMenu>
            {bottomItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  {item.onClick ? (
                    <button onClick={() => item.onClick?.(true)} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    item.href && (
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onSignOut} disabled={isSigningOut}>
                <LogOut className="h-4 w-4" />
                <span>{isSigningOut ? 'Signing out...' : 'Log out'}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="mt-1 flex items-center gap-3 px-2 py-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-xs leading-tight">
              <span className="font-medium">{userName}</span>
              <span className="text-muted-foreground">{userEmail}</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <Settings open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}

export default AppSidebar;

