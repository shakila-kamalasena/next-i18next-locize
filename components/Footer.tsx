import { FC } from 'react';
import pkg from 'next-i18next/package.json';

interface FooterProps {
  t: (key: string) => string;
}

export const Footer: FC<FooterProps> = ({ t }) => {
  return (
    <footer>
      <p>
        {t('description')}
      </p>
      <p>
        next-i18next v
        {pkg.version}
      </p>
    </footer>
  );
};
