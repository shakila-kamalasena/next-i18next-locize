'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useTranslation } from '../i18n/client-provider';

export default function Home({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const pathname = usePathname();
  const { t, i18n } = useTranslation(locale, ['common', 'footer']);

  // Similar to the original useEffect for reloadResources
  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ['common', 'footer']);
  }, [i18n]);

  return (
    <>
      <main>
        <Header title={t('h1')} />
        <div>
          <Link
            href={pathname || `/${locale}`}
            locale={locale === 'en' ? 'de' : 'en'}
          >
            <button>
              {t('change-locale')}
            </button>
          </Link>
          <Link href={`/${locale}/second-page`}>
            <button
              type='button'
            >
              {t('to-second-page')}
            </button>
          </Link>
        </div>
      </main>
      <Footer t={t} />
    </>
  );
}
