'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BarChart2, Bell, Bookmark, Home, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react';
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
import { authClient, type DemoAuthSession } from '../../lib/auth-client';

const navItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Analytics', icon: BarChart2, href: '/analytics' },
  { label: 'Users', icon: Users, href: '/users' },
  { label: 'Bookmarks', icon: Bookmark, href: '/bookmarks' },
  { label: 'Notifications', icon: Bell, href: '/notifications' },
];

const bottomItems = [
  { label: 'Settings', icon: Settings, href: '/settings' },
];

function AppSidebar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const userName = demoSession?.user?.name ?? 'User';
  const userEmail = demoSession?.user?.email ?? 'user@example.com';
  const tenantName = demoSession?.tenant?.name ?? 'Tenant';
  const tenantSlug = demoSession?.tenant?.slug ?? 'tenant';
  const fallback = userName
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

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
            {tenantName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight">{tenantName}</span>
            <span className="text-[11px] text-muted-foreground">{tenantSlug}</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Main nav */}
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

      {/* Footer */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
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

        {/* User profile */}
        <div className="flex items-center gap-3 px-2 py-3 mt-1">
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
  );
}

export default AppSidebar;
