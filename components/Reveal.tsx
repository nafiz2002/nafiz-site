'use client';

import { useEffect, useRef, useState } from 'react';

type Variant = 'up' | 'left' | 'fade' | 'line' | 'plain';

export default function Reveal({
  children,
  delay = 0,
  variant = 'up',
  as: Tag = 'div',
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: Variant;
  as?: any;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setShown(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  const base =
    variant === 'plain' ? '' : variant === 'line' ? 'rv-line' : `rv rv-${variant}`;

  return (
    <Tag
      ref={ref}
      className={`${base} ${shown ? 'shown' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
