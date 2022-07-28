import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SocketProvider } from '../context/SocketProvider';
import { NotificationsProvider } from '@mantine/notifications';
import { useRouteChanging } from '../hooks/useRouteChanging';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  useRouteChanging();

  return (
    <>
      <Head>
        <title>Chatcito</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: 'dark' }}
        >
          <NotificationsProvider>
            <SocketProvider>
              <Component {...pageProps} />
            </SocketProvider>
          </NotificationsProvider>
        </MantineProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
