'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '../../../lib/auth-client';

export function useRedirectIfAuthenticated() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace('/');
    }
  }, [isPending, router, session]);
}

