import React from 'react';
import { ReceivedInvitations } from '@/features/invitations/ReceivedInvitations';
import { Page } from '@/layouts/Page';

const NotificationsPage = () => {
  return (
    <Page headerTitle="Notificaciones">
      <ReceivedInvitations />
    </Page>
  );
};

export default NotificationsPage;
