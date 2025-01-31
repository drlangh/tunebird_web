import type { PropsWithChildren } from 'react';

export default function PlayLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg">
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
