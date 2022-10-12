import React, { PropsWithChildren } from 'react';
import api from '@/api';
import { User } from '@/types';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Page } from '@/layouts/Page';
import { Center, Loader } from '@mantine/core';

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const renderRef = React.useRef(0);
  renderRef.current++;

  const { isLoading, isError } = useQuery(
    ['user'],
    () => api.get<User>('/users/me'),
    {
      retry: false,
      refetchOnWindowFocus: false,
      onError() {
        if (router.pathname !== '/') {
          router.push('/');
        }
      },
      onSuccess() {
        if (router.pathname === '/' && renderRef.current <= 1) {
          router.push('/home');
        }
      },
    }
  );

  if (isLoading || (isError && router.pathname !== '/')) {
    return (
      <Page full>
        <Center sx={{ flex: 1 }}>
          <Loader />
        </Center>
      </Page>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};
