import type { ReactNode } from 'react';

interface StepProps {
  title: string;
  children?: ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="step-item flex gap-4 pb-8 last:pb-0">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest text-sm font-semibold text-paper" />
        <div className="step-line mt-2 w-px flex-1 bg-forest/20" />
      </div>
      <div className="flex-1 pt-1">
        <h4 className="mb-2 font-heading text-base font-semibold text-forest">{title}</h4>
        {children && <div className="prose prose-sm max-w-none">{children}</div>}
      </div>
    </div>
  );
}

interface StepsProps {
  children: ReactNode;
}

export function Steps({ children }: StepsProps) {
  return <div className="steps my-6">{children}</div>;
}
