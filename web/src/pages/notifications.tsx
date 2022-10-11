import React from 'react';
import { ReceivedInvitations } from '../features/invitations/ReceivedInvitations';
import { Page } from '../layouts/Page';
import { withAuthGSSP } from '../utils/withAuthGSSP';

const NotificationsPage = () => {
  return (
    <Page headerTitle="Notificaciones">
      <ReceivedInvitations />
    </Page>
  );
};

export default NotificationsPage;

export const getServerSideProps = withAuthGSSP();
