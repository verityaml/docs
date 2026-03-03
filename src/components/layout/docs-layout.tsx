import type { ReactNode } from 'react';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import { Footer } from './footer';

interface DocsLayoutProps {
  pathname: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function DocsLayout({ pathname, title, description, children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar pathname={pathname} />
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 lg:px-6">
        <Sidebar pathname={pathname} />
        <main className="min-w-0 flex-1 py-8 lg:pl-8">
          <header className="mb-8">
            <h1 className="font-heading text-3xl font-semibold text-forest">{title}</h1>
            {description && (
              <p className="mt-2 text-lg text-ink/60">{description}</p>
            )}
          </header>
          <article className="prose prose-lg max-w-none">
            {children}
          </article>
        </main>
      </div>
      <Footer />
      <MobileNav pathname={pathname} />
    </div>
  );
}
