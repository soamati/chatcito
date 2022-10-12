import React from 'react';
import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { useAccept, useReject } from './queries';
import { Invitation } from '@/types';

type Props = {
  invitation: Invitation;
};

export const InvitationItem = ({ invitation }: Props) => {
  const [accept, isAccepting] = useAccept();
  const [reject, isRejecting] = useReject();

  return (
    <Paper p="xs" withBorder radius={0}>
      <Stack spacing="xs">
        <Text>
          <Text component="span" color="blue">
            {invitation.sender.name}
          </Text>{' '}
          te invitó a unirte a la sala{' '}
          <Text component="span" color="blue">
            {invitation.room.name}
          </Text>
        </Text>

        <Group spacing="xs" position="right">
          <Button
            compact
            onClick={() => accept(invitation.id)}
            loading={isAccepting}
          >
            Aceptar
          </Button>
          <Button
            compact
            color="red"
            onClick={() => reject(invitation.id)}
            loading={isRejecting}
          >
            Rechazar
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
