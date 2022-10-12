import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SocketProvider } from '../context/SocketProvider';
import { NotificationsProvider } from '@mantine/notifications';
import { useRouteChanging } from '../hooks/useRouteChanging';
import { AuthGuard } from '@/context/AuthGuard';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

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
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme }}
          >
            <AuthGuard>
              <NotificationsProvider>
                <SocketProvider>
                  <Component {...pageProps} />
                </SocketProvider>
              </NotificationsProvider>
            </AuthGuard>
          </MantineProvider>
        </ColorSchemeProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
