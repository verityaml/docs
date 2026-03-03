import type { ReactNode } from 'react';

interface ParamFieldProps {
  path?: string;
  query?: string;
  body?: string;
  type?: string;
  required?: boolean;
  children?: ReactNode;
}

export function ParamField({ path, query, body, type, required, children }: ParamFieldProps) {
  const name = path ?? query ?? body ?? '';
  const location = path ? 'path' : query ? 'query' : 'body';

  return (
    <div className="my-3 rounded-md border border-clay/20 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <code className="text-sm font-semibold text-forest">{name}</code>
        {type && (
          <span className="rounded bg-forest/10 px-1.5 py-0.5 text-xs text-forest">
            {type}
          </span>
        )}
        <span className="rounded bg-ink/5 px-1.5 py-0.5 text-xs text-ink/50">
          {location}
        </span>
        {required && (
          <span className="text-xs font-medium text-red-600">required</span>
        )}
      </div>
      {children && (
        <div className="mt-2 text-sm text-ink/70 [&>div]:mt-2">{children}</div>
      )}
    </div>
  );
}
