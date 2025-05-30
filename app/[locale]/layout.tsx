'use client';

import { ClientProvider } from '../i18n/client-provider';
import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <CookiesProvider>
      <ClientProvider locale={locale}>
        {children}
      </ClientProvider>
    </CookiesProvider>
  );
}
