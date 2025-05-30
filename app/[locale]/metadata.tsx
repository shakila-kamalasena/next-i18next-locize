import type { Metadata } from 'next';
import { languages } from '../i18n/settings';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Validate that the incoming locale is valid
  const locale = languages.includes(params.locale) 
    ? params.locale 
    : 'en';

  return {
    title: 'Next.js i18n with Locize',
    description: 'Next.js App Router with i18n and Locize integration',
    generator: 'Next.js',
    applicationName: 'Next.js i18n App',
    referrer: 'origin-when-cross-origin',
    keywords: ['Next.js', 'React', 'i18n', 'Locize'],
    metadataBase: new URL('https://localhost:3000'),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        languages.map(lang => [lang, `/${lang}`])
      )
    }
  };
}
