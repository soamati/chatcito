import React from 'react';
import { FriendRequests } from '@/features/friendships/FriendRequests';
import { Page } from '@/layouts/Page';

const FriendRequestsPage = () => {
  return (
    <Page headerTitle="Solicitudes pendientes">
      <FriendRequests />
    </Page>
  );
};

export default FriendRequestsPage;
