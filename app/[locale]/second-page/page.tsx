'use client';

import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useTranslation } from '../../i18n/client-provider';
import { useEffect } from 'react';

export default function SecondPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const { t, i18n } = useTranslation(locale, ['second-page', 'footer']);

  // Similar to the original useEffect for reloadResources
  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ['second-page', 'footer']);
  }, [i18n]);

  return (
    <>
      <main>
        <Header title={t('h1')} />
        <Link href={`/${locale}`}>
          <button
            type='button'
          >
            {t('back-to-home')}
          </button>
        </Link>
      </main>
      <Footer t={t} />
    </>
  );
}
