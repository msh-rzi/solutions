'use client';

import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient, DEMO_ACCOUNTS } from '../../../lib/auth-client';
import { SignInResult } from './types';

export function useLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_ACCOUNTS[0]?.email ?? '');
  const [password, setPassword] = useState(DEMO_ACCOUNTS[0]?.password ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectDemoAccount = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = (await authClient.signIn.email({ email, password })) as SignInResult;

      if (result?.error) {
        setErrorMessage(result.error.message ?? 'Sign in failed.');
        return;
      }

      router.replace('/');
      router.refresh();
    } catch {
      setErrorMessage('Unable to sign in right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    errorMessage,
    selectDemoAccount,
    onSubmit,
  };
}

