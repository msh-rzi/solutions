import { SidebarProvider } from '@repo/ui-shadcn';
import Sidebar from '../../components/layout/Sidebar';
import UsersMain from '../../components/pages/users/UsersMain';

export default async function UsersPage() {
  return (
    <SidebarProvider>
      <main className="mx-auto flex min-h-screen h-screen w-full justify-center gap-6 p-4">
        <Sidebar />
        <UsersMain />
      </main>
    </SidebarProvider>
  );
}
