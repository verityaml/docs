import {
  Route, Rocket, Code, Gauge, LineChart, Book, FileInput,
  ListChecks, Link as LinkIcon, Archive,
} from 'lucide-react';
import type { ReactNode } from 'react';

const iconMap: Record<string, typeof Route> = {
  'route': Route,
  'rocket': Rocket,
  'code': Code,
  'gauge-high': Gauge,
  'chart-line': LineChart,
  'book': Book,
  'file-import': FileInput,
  'list-check': ListChecks,
  'link': LinkIcon,
  'box-archive': Archive,
};

interface CardProps {
  title: string;
  icon?: string;
  href?: string;
  children?: ReactNode;
}

export function Card({ title, icon, href, children }: CardProps) {
  const Icon = icon ? iconMap[icon] : null;

  const content = (
    <div className="flex h-full flex-col rounded-lg border border-clay/30 bg-white p-5 transition-colors hover:border-forest/30">
      {Icon && (
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-forest/10">
          <Icon className="h-5 w-5 text-forest" />
        </div>
      )}
      <h3 className="mb-1 font-heading text-base font-semibold text-forest">{title}</h3>
      {children && <div className="text-sm text-ink/70">{children}</div>}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline">
        {content}
      </a>
    );
  }

  return content;
}

interface CardGroupProps {
  cols?: 2 | 3;
  children: ReactNode;
}

export function CardGroup({ cols = 2, children }: CardGroupProps) {
  const gridCols = cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  return (
    <div className={`my-6 grid grid-cols-1 gap-4 ${gridCols}`}>
      {children}
    </div>
  );
}
