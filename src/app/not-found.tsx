import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper">
      <h1 className="font-heading text-4xl font-semibold text-forest">404</h1>
      <p className="mt-2 text-ink/60">Page not found</p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-forest px-4 py-2 text-sm font-medium text-paper no-underline transition-colors hover:bg-forest/90"
      >
        Back to docs
      </Link>
    </div>
  );
}
