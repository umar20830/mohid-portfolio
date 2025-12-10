'use client';

import { useEffect } from 'react';
import { useLenis } from '@/hooks';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useLenis();

  return <>{children}</>;
}
