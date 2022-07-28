import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

export const Mobile = ({ children }: PropsWithChildren) => {
  return <MediaQuery maxWidth={767}>{children}</MediaQuery>;
};
