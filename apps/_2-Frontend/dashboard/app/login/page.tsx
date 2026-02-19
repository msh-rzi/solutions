'use client';

import { Button, Input, Label } from '@repo/ui-shadcn';
import { DemoAccounts } from '../../components/pages/login/DemoAccounts';
import { useLoginForm } from '../../components/pages/login/useLoginForm';
import { useRedirectIfAuthenticated } from '../../components/pages/login/useRedirectIfAuthenticated';

export default function LoginPage() {
  useRedirectIfAuthenticated();

  const { email, setEmail, password, setPassword, isSubmitting, errorMessage, selectDemoAccount, onSubmit } = useLoginForm();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-4">
      <section className="w-full rounded-xl border bg-card p-6 shadow-sm">
        <header className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight">Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Memory-only auth with two tenant users.</p>
        </header>

        <form onSubmit={onSubmit} className="space-y-4">
          <DemoAccounts disabled={isSubmitting} onSelect={selectDemoAccount} />

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} required />
          </div>

          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </section>
    </main>
  );
}

