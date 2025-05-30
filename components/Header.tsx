import { FC } from 'react';

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => (
  <>
    <h2>
      next-i18next
      <hr />
    </h2>
    <h1>
      {title}
    </h1>
    <a
      className='github'
      href='//github.com/i18next/next-i18next'
    >
      <i className='typcn typcn-social-github-circular' />
    </a>
  </>
);
