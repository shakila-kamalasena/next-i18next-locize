'use client';

import Link from 'next/link';
import { useTranslation } from '../i18n/client-provider';
import { useParams } from 'next/navigation';

export default function NotFound() {
  const { locale } = useParams() as { locale: string };
  const { t } = useTranslation(locale, ['common']);

  return (
    <div>
      <h2>Not Found</h2>
      <p>{t('not-found')}</p>
      <Link href={`/${locale}`}>
        {t('back-to-home')}
      </Link>
    </div>
  );
}
