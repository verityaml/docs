import { Github } from 'lucide-react';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-clay/20 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-6">
        <p className="text-xs text-ink/40">&copy; {YEAR} Verity</p>
        <a
          href="https://github.com/verity-aml"
          className="text-ink/40 transition-colors hover:text-ink/60"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
