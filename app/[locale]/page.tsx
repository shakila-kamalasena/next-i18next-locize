'use client';

import { use, useEffect } from 'react';
import { useTranslation } from '../i18n/client-provider';

export default function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  const { t, i18n } = useTranslation(locale, ['common']);

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ['common']);
  }, [i18n]);


  return (
    <>
      <h1>Locize</h1>

      {t('change-locale')}
      <br />
      {t('common:welcome')}
      <br />
      {t('common:description')}
      <br />

    </>
  );
}