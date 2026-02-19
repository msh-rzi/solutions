import { SidebarProvider } from '@repo/ui-shadcn';
import Main from '../components/layout/Main';
import Sidebar from '../components/layout/Sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <main className="mx-auto flex min-h-screen h-screen w-full justify-center gap-6 p-4">
        <Sidebar />
        <Main />
      </main>
    </SidebarProvider>
  );
}

