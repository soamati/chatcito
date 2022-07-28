import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

export const Desktop = ({ children }: PropsWithChildren) => {
  return <MediaQuery minWidth={768}>{children}</MediaQuery>;
};
