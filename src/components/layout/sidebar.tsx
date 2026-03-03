import { getActiveTab } from '@/lib/navigation';
import { SidebarGroups } from './sidebar-groups';

interface SidebarProps {
  pathname: string;
}

export function Sidebar({ pathname }: SidebarProps) {
  const tab = getActiveTab(pathname);

  return (
    <aside className="hidden w-64 flex-shrink-0 lg:block">
      <nav className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto py-6 pr-4">
        <SidebarGroups groups={tab.groups} pathname={pathname} />
      </nav>
    </aside>
  );
}
