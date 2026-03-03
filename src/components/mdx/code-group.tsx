'use client';

import { useState, useMemo, Children, isValidElement, type ReactNode } from 'react';

interface CodeGroupProps {
  children: ReactNode;
}

export function CodeGroup({ children }: CodeGroupProps) {
  const [active, setActive] = useState(0);

  const childArray = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );

  const labels = useMemo(
    () =>
      childArray.map((child, i) => {
        const props = child.props as Record<string, unknown>;
        if (typeof props?.title === 'string') return props.title;
        if (typeof props?.['data-language'] === 'string') return props['data-language'];
        if (props?.children && isValidElement(props.children)) {
          const codeProps = (props.children as React.ReactElement).props as Record<string, unknown>;
          if (typeof codeProps?.['data-meta'] === 'string') return codeProps['data-meta'];
          if (typeof codeProps?.className === 'string') {
            return codeProps.className.replace('language-', '');
          }
        }
        return `Tab ${i + 1}`;
      }),
    [childArray],
  );

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-clay/20">
      <div className="flex border-b border-clay/20 bg-ink/5">
        {labels.map((label, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              i === active
                ? 'border-b-2 border-forest text-forest'
                : 'text-ink/50 hover:text-ink/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="[&>pre]:!mt-0 [&>pre]:!rounded-none [&>pre]:!border-0">
        {childArray[active]}
      </div>
    </div>
  );
}
