'use client';

import { ClientProvider } from '../i18n/client-provider';
import { ReactNode, useEffect, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { usePathname } from 'next/navigation';

export default function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <CookiesProvider>
      <ClientProvider locale={locale}>
        {children}
      </ClientProvider>
    </CookiesProvider>
  );
}