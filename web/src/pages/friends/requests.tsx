import React from 'react';
import { FriendRequests } from '@/features/friendships/FriendRequests';
import { Page } from '@/layouts/Page';
import { withAuthGSSP } from '@/utils/withAuthGSSP';

const FriendRequestsPage = () => {
  return (
    <Page headerTitle="Solicitudes pendientes">
      <FriendRequests />
    </Page>
  );
};

export default FriendRequestsPage;

export const getServerSideProps = withAuthGSSP();
