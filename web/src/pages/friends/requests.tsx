import { Box } from '@mantine/core';
import React from 'react';
import { FriendRequests } from '../../features/friendships/FriendRequests';
import { BottomNav } from '../../layouts/BottomNav';
import { Header } from '../../layouts/Header';
import { Page } from '../../layouts/Page';
import { withAuthGSSP, WithUserProps } from '../../utils/withAuthGSSP';

const FriendRequestsPage = ({ user }: WithUserProps<{}>) => {
  return (
    <>
      <Header title="Solicitudes pendientes" />
      <Page>
        <Box py={64} sx={{ height: '100%' }}>
          <FriendRequests />
        </Box>
      </Page>
      <BottomNav />
    </>
  );
};

export default FriendRequestsPage;

export const getServerSideProps = withAuthGSSP();
