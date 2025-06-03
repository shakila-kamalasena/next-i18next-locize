'use client';

import React from 'react';
import { useState, useEffect, ReactNode } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { useCookies } from 'react-cookie';
import LocizeBackend from 'i18next-locize-backend';
import ChainedBackend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { languages, defaultNS, fallbackLng, namespaces } from '../i18n/settings';

// Initialize i18next for client-side
const isBrowser = typeof window !== 'undefined'; // A boolean variable that is true if the code is running in a browser environment, false otherwise (such as on the server).
const isDev = process.env.NODE_ENV === 'development';

i18next
  .use(initReactI18next)
  .use(ChainedBackend) // Allows chaining multiple backends.
  .init({
    supportedLngs: languages,
    fallbackLng: fallbackLng,
    ns: namespaces,
    defaultNS,
    backend: {
      backendOptions: [
        {
          expirationTime: 5 * 60 * 1000 // 5min
        },
        {
          projectId: '9617434f-44e6-4ab6-976e-3d5594128d90',
          version: 'latest'
        }
      ],
      backends: isBrowser ? [
        LocalStorageBackend, // Used for caching translations in the browser's local storage
        LocizeBackend // Used to fetch translations from the Locize CDN
      ] : []
    },
    load: 'languageOnly',
    interpolation: {
      escapeValue: false, // Disables escaping of translation values because React already escapes values to prevent XSS attacks.
    },
    react: {
      useSuspense: false,
    },
    saveMissing: isDev && isBrowser
  } as import('i18next').InitOptions);

export function useTranslation(lng: string, ns?: string | string[], options?: Record<string, unknown>) {
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
