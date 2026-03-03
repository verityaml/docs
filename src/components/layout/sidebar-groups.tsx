import Link from 'next/link';
import type { NavGroup } from '@/lib/navigation';

interface SidebarGroupsProps {
  groups: NavGroup[];
  pathname: string;
  onNavigate?: () => void;
}

export function SidebarGroups({ groups, pathname, onNavigate }: SidebarGroupsProps) {
  return (
    <>
      {groups.map((group) => (
        <div key={group.group} className="mb-6">
          <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-ink/40">
            {group.group}
          </h4>
          <ul className="space-y-0.5">
            {group.pages.map((page) => {
              const isActive = pathname === page.href;
              return (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    onClick={onNavigate}
                    className={`sidebar-link no-underline ${
                      isActive ? 'sidebar-link-active' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}
