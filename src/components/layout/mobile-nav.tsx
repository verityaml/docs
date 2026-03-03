'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { navigation, getActiveTab } from '@/lib/navigation';
import { SidebarGroups } from './sidebar-groups';

interface MobileNavProps {
  pathname: string;
}

export function MobileNav({ pathname }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const tab = getActiveTab(pathname);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-paper shadow-lg"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-ink/30"
            onClick={close}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-paper p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/light.svg" alt="Verity" className="h-7" />
              <button onClick={close} aria-label="Close navigation">
                <X className="h-5 w-5 text-ink/50" />
              </button>
            </div>

            <div className="mb-6 flex gap-1">
              {navigation.map((t) => {
                const firstPage = t.groups[0]?.pages[0]?.href ?? '/';
                const isActive = t.slug === tab.slug;
                return (
                  <Link
                    key={t.tab}
                    href={firstPage}
                    onClick={close}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium no-underline ${
                      isActive
                        ? 'bg-forest/10 text-forest'
                        : 'text-ink/50 hover:text-ink'
                    }`}
                  >
                    {t.tab}
                  </Link>
                );
              })}
            </div>

            <SidebarGroups groups={tab.groups} pathname={pathname} onNavigate={close} />
          </div>
        </>
      )}
    </div>
  );
}
