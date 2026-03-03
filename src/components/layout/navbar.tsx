import Link from 'next/link';
import { navigation, getActiveTab } from '@/lib/navigation';

interface NavbarProps {
  pathname: string;
}

export function Navbar({ pathname }: NavbarProps) {
  const activeTab = getActiveTab(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-clay/20 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 lg:px-6">
        <Link href="/" className="mr-8 font-heading text-xl font-semibold uppercase tracking-wide text-forest no-underline">
          Verity.
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((tab) => {
            const firstPage = tab.groups[0]?.pages[0]?.href ?? '/';
            const isActive = tab.slug === activeTab.slug;
            return (
              <Link
                key={tab.tab}
                href={firstPage}
                className={`rounded-md px-3 py-1.5 text-sm font-medium no-underline transition-colors ${
                  isActive
                    ? 'bg-forest/10 text-forest'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                {tab.tab}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            href="https://app.verityaml.com"
            className="hidden text-sm text-ink/60 no-underline hover:text-ink md:inline"
          >
            App
          </a>
          <a
            href="https://app.verityaml.com/signup"
            className="rounded-md bg-forest px-3.5 py-1.5 text-sm font-medium text-paper no-underline transition-colors hover:bg-forest/90"
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}
