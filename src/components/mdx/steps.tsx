import { Children, isValidElement, type ReactNode } from 'react';

interface StepProps {
  title: string;
  children?: ReactNode;
  /** Injected by Steps parent */
  index?: number;
}

export function Step({ title, children, index }: StepProps) {
  return (
    <div className="step-item relative flex gap-4 pb-6 last:pb-0">
      <div className="not-prose flex flex-col items-center">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-forest/30 bg-paper font-mono text-xs font-semibold text-forest">
          {index ?? ''}
        </div>
        <div className="step-line mt-1 w-px flex-1 bg-forest/15" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <h4 className="mb-1 font-heading text-base font-semibold text-forest">{title}</h4>
        {children && <div className="prose prose-sm max-w-none">{children}</div>}
      </div>
    </div>
  );
}

interface StepsProps {
  children: ReactNode;
}

export function Steps({ children }: StepsProps) {
  let i = 0;
  const numbered = Children.map(children, (child) => {
    if (isValidElement<StepProps>(child) && child.type === Step) {
      i += 1;
      return <Step {...child.props} index={i} />;
    }
    return child;
  });
  return <div className="steps not-prose my-6">{numbered}</div>;
}
