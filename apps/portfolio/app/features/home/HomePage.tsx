import { getWorkspaceProjects } from '../../components/sections/projects/projectInventory';
import { HomePageClient } from './HomePageClient';

export async function HomePage() {
  const projects = await getWorkspaceProjects();

  return <HomePageClient projects={projects} />;
}
