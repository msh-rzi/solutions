import { SidebarProvider } from '@repo/ui-shadcn';
import Sidebar from '../../components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <main className="mx-auto flex min-h-screen h-screen w-full justify-center gap-6 p-4">
        <Sidebar />
        {children}
      </main>
    </SidebarProvider>
  );
}

