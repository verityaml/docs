import { Info, Lightbulb, AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

interface CalloutProps {
  children: ReactNode;
}

function Callout({
  children,
  icon: Icon,
  borderColor,
  bgColor,
  iconColor,
}: CalloutProps & {
  icon: typeof Info;
  borderColor: string;
  bgColor: string;
  iconColor: string;
}) {
  return (
    <div
      className="my-4 rounded-r-lg border-l-4 p-4"
      style={{ borderColor, backgroundColor: bgColor }}
    >
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: iconColor }} />
        <div className="prose prose-sm max-w-none">{children}</div>
      </div>
    </div>
  );
}

export function Note({ children }: CalloutProps) {
  return (
    <Callout
      icon={Info}
      borderColor="#2A382E"
      bgColor="#D0DCD9"
      iconColor="#2A382E"
    >
      {children}
    </Callout>
  );
}

export function Tip({ children }: CalloutProps) {
  return (
    <Callout
      icon={Lightbulb}
      borderColor="#D4E157"
      bgColor="#f5f8e8"
      iconColor="#7a8a00"
    >
      {children}
    </Callout>
  );
}

export function Warning({ children }: CalloutProps) {
  return (
    <Callout
      icon={AlertTriangle}
      borderColor="#C9A690"
      bgColor="#fdf6f0"
      iconColor="#b8845e"
    >
      {children}
    </Callout>
  );
}
