import type { ReactNode } from 'react';

interface ResponseFieldProps {
  name: string;
  type?: string;
  children?: ReactNode;
}

export function ResponseField({ name, type, children }: ResponseFieldProps) {
  return (
    <div className="my-3 rounded-md border border-clay/20 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <code className="text-sm font-semibold text-forest">{name}</code>
        {type && (
          <span className="rounded bg-forest/10 px-1.5 py-0.5 text-xs text-forest">
            {type}
          </span>
        )}
      </div>
      {children && <p className="mt-2 text-sm text-ink/70">{children}</p>}
    </div>
  );
}
