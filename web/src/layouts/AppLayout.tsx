import dynamic from 'next/dynamic';
import React, { PropsWithChildren } from 'react';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <MediaQuery maxWidth={767}>{children}</MediaQuery>

      <MediaQuery minWidth={768}>{children}</MediaQuery>
    </>
  );
};
