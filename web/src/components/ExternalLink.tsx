import React, { PropsWithChildren } from 'react';
import Link from 'next/link';

type Props = PropsWithChildren<{
  href: string;
}>;

const ExternalLink = ({ children, href }: Props) => {
  return (
    <Link href={href} passHref>
      <a
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        {children}
      </a>
    </Link>
  );
};

export default ExternalLink;
