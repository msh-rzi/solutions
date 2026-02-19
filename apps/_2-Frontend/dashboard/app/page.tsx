'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider } from '@repo/ui-shadcn';
import Main from '../components/layout/Main';
import Sidebar from '../components/layout/Sidebar';
import { authClient } from '../lib/auth-client';

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/login');
    }
  }, [isPending, router, session]);

  if (isPending || !session) {
    return (
      <main className="mx-auto flex min-h-screen w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking session...</p>
      </main>
    );
  }

  return (
    <SidebarProvider>
      <main className="mx-auto flex min-h-screen h-screen w-full justify-center gap-6 p-4">
        <Sidebar />
        <Main />
      </main>
    </SidebarProvider>
  );
}
