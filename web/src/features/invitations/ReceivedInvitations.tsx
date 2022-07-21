import { Stack } from '@mantine/core';
import React from 'react';
import { Loader } from '../../components/Loader';
import { InvitationItem } from './InvitationItem';
import { useReceivedInvitations } from './queries';

export const ReceivedInvitations = () => {
  const [invitations] = useReceivedInvitations();

  if (!invitations) {
    return <Loader />;
  }

  return (
    <Stack m="md">
      {invitations.map((invitation) => (
        <InvitationItem key={invitation.id} invitation={invitation} />
      ))}
    </Stack>
  );
};
