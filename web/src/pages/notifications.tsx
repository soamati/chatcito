import { Box } from '@mantine/core';
import React from 'react';
import { ReceivedInvitations } from '../features/invitations/ReceivedInvitations';
import { BottomNav } from '../layouts/BottomNav';
import { Header } from '../layouts/Header';
import { Page } from '../layouts/Page';
import { withAuthGSSP } from '../utils/withAuthGSSP';

const NotificationsPage = () => {
  return (
    <>
      <Header title="Notificaciones" />

      <Page>
        <Box py={64} sx={{ height: '100%' }}>
          <ReceivedInvitations />
        </Box>
      </Page>

      <BottomNav />
    </>
  );
};

export default NotificationsPage;

export const getServerSideProps = withAuthGSSP();
