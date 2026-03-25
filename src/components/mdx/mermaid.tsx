'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidProps {
  chart: string;
  caption?: string;
  minHeight?: number;
}

export function Mermaid({ chart, caption, minHeight }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#D0DCD9',
          primaryTextColor: '#1C1C1B',
          primaryBorderColor: '#2A382E',
          lineColor: '#2A382E',
          secondaryColor: '#F2F0EB',
          tertiaryColor: '#fdf6f0',
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
        },
        flowchart: {
          htmlLabels: true,
          curve: 'linear',
          padding: 12,
        },
      });

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      mermaid
        .render(id, chart)
        .then(({ svg: renderedSvg }) => setSvg(renderedSvg))
        .catch((err) => setError(String(err)));
    });
  }, [chart]);

  if (error) {
    return (
      <pre className="my-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </pre>
    );
  }

  return (
    <figure className="my-6">
      <div
        ref={containerRef}
        className="overflow-x-auto rounded-lg border border-[#D0DCD9] bg-[#F2F0EB] p-4 [&>svg]:w-full"
        style={minHeight ? { minHeight } : undefined}
        // Safe: chart content is hardcoded in MDX source files, not user input
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-[#1C1C1B]/50">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
