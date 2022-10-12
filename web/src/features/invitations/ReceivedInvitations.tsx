import React from 'react';
import { Center, Stack, Text } from '@mantine/core';
import { InvitationItem } from './InvitationItem';
import { useReceivedInvitations } from './queries';

export const ReceivedInvitations = () => {
  const [invitations] = useReceivedInvitations();

  if (!invitations) {
    return null;
  }

  if (!invitations.length) {
    return (
      <Center sx={{ height: '100%' }}>
        <Text>No hay notificaciones</Text>
      </Center>
    );
  }

  return (
    <Stack mt="xs" spacing="xs">
      {invitations.map((invitation) => (
        <InvitationItem key={invitation.id} invitation={invitation} />
      ))}
    </Stack>
  );
};
