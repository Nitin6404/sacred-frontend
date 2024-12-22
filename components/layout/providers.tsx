'use client';

import React, { PropsWithChildren } from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import ApiProvider from '@/lib/apiConfig/apiProvider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ApiProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </ApiProvider>
    </>
  );
}
