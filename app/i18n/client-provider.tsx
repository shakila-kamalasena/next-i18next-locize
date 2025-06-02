'use client';

import React from 'react';
import { useState, useEffect, ReactNode } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { useCookies } from 'react-cookie';
import LocizeBackend from 'i18next-locize-backend/cjs';
import { languages, defaultNS, fallbackLng } from '../i18n/settings';

// Initialize i18next for client-side
const isBrowser = typeof window !== 'undefined';
const isDev = process.env.NODE_ENV === 'development';

i18next
  .use(initReactI18next)
  .use(LocizeBackend)
  .init({
    debug: true,
    supportedLngs: languages,
    fallbackLng: fallbackLng,
    defaultNS,
    backend: {
      projectId: process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID,
      apiKey: process.env.NEXT_PUBLIC_LOCIZE_API_KEY,
      referenceLng: 'en',
      version: 'latest',
      loadPath: 'https://api.locize.app/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
    },
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    ns: ['common', 'home'],
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
