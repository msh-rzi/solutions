import { SidebarProvider } from '@repo/ui-shadcn';
import Sidebar from '../../components/layout/Sidebar';
import NotificationsMain from '../../components/pages/notifications/NotificationsMain';

export default async function NotificationsPage() {
  return (
    <SidebarProvider>
      <main className="mx-auto flex min-h-screen h-screen w-full justify-center gap-6 p-4">
        <Sidebar />
        <NotificationsMain />
      </main>
    </SidebarProvider>
  );
}
