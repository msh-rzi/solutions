import { SidebarProvider } from '@repo/ui-shadcn';
import Sidebar from '../../components/layout/Sidebar';
import AnalyticsMain from '../../components/pages/analytics/AnalyticsMain';

export default async function AnalyticsPage() {
  return (
    <SidebarProvider>
      <main className="mx-auto flex min-h-screen h-screen w-full justify-center gap-6 p-4">
        <Sidebar />
        <AnalyticsMain />
      </main>
    </SidebarProvider>
  );
}
