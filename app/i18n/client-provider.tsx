'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { useCookies } from 'react-cookie';
import LocizeBackend from 'i18next-locize-backend';
import ChainedBackend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { languages, defaultNS } from '../i18n/settings';
import resourcesToBackend from 'i18next-resources-to-backend';

// Initialize i18next for client-side
const isBrowser = typeof window !== 'undefined';
const isDev = process.env.NODE_ENV === 'development';

i18next
  .use(initReactI18next)
  .use(ChainedBackend)
  .init({
    debug: isDev,
    supportedLngs: languages,
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS,
    backend: {
      backendOptions: [
        {
          expirationTime: 60 * 60 * 1000 // 1 hour
        },
        {
          projectId: '9617434f-44e6-4ab6-976e-3d5594128d90',
          version: 'latest'
        }
      ],
      backends: isBrowser ? [
        LocalStorageBackend,
        LocizeBackend
      ] : []
    },
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    // Remove properties not supported by the TypeScript definitions
    saveMissing: isDev && isBrowser
  } as any); // Use type assertion to bypass TypeScript errors

// Load resources
languages.forEach((lng) => {
  ['common'].forEach((ns) => {
    const resModule = require(`../../public/locales/${lng}/${ns}.json`);
    i18next.addResourceBundle(lng, ns, resModule);
  });
});

export function useTranslation(lng: string, ns?: string | string[], options?: any) {
  const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);
  const ret = useTranslationOrg(ns, options);

  // Set cookie on client side
  useEffect(() => {
    if (cookies.NEXT_LOCALE !== lng) {
      setCookie('NEXT_LOCALE', lng, { path: '/' });
    }
  }, [lng, cookies.NEXT_LOCALE, setCookie]);

  // Language switching
  const { i18n } = ret;
  useEffect(() => {
    if (i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return ret;
}

interface ClientProviderProps {
  children: ReactNode;
  locale: string;
}

export function ClientProvider({ children, locale }: ClientProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    i18next.changeLanguage(locale);
    setMounted(true);
  }, [locale]);

  // SSR: Prevent a hydration mismatch by only showing content after mounting
  if (!mounted) return null;

  return <>{children}</>;
}
