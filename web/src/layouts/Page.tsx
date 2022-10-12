import React, { PropsWithChildren } from 'react';
import { Box, Container, Paper } from '@mantine/core';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { SideNav } from './SideNav';
import { Mobile } from '../components/Mobile';
import { Desktop } from '../components/Desktop';

type Props = {
  headerTitle?: string;
  HeaderSide?: React.ReactNode;
  showHeader?: boolean;
  showBottomNav?: boolean;
  full?: boolean;
};

export const Page = ({
  children,
  headerTitle,
  HeaderSide,
  showHeader = true,
  showBottomNav = true,
  full = false,
}: PropsWithChildren<Props>) => {
  if (full) {
    return (
      <Container
        size="sm"
        sx={{ display: 'flex', minHeight: '100vh', padding: 0 }}
      >
        {children}
      </Container>
    );
  }

  return (
    <Container
      size="sm"
      sx={{ display: 'flex', minHeight: '100vh', padding: 0 }}
    >
      <Desktop>
        <Box>
          <SideNav />
        </Box>
      </Desktop>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {showHeader && <Header title={headerTitle} Side={HeaderSide} />}

        <Paper withBorder radius={0} sx={{ flex: 1 }}>
          {children}
        </Paper>
      </Box>

      {showBottomNav && (
        <Mobile>
          <MobileNav />
        </Mobile>
      )}
    </Container>
  );
};
