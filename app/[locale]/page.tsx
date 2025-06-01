'use client';

import React from 'react';
import { use } from 'react';
import { useTranslation } from '../i18n/client-provider';

export default function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  const { t } = useTranslation(locale, ['common']);

  return (
    <>
      <h1>Locize</h1>

      {t('change-locale')}
      <br />
      {t('common:welcome')}
      <br />
      {t('common:description')}
      <br />
      {t('common:for-testing')}

    </>
  );
}