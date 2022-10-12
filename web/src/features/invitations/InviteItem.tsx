import React from 'react';
import { Button, Group, Paper } from '@mantine/core';
import { useInvite } from './queries';
import { User } from '@/types';
import { UserPreview } from '@/components/UserPreview';

type Props = {
  friend: User;
};

export const InviteItem = ({ friend }: Props) => {
  const [invite, isInviting] = useInvite();

  return (
    <Paper px="md" py="xs" withBorder radius={0}>
      <Group position="apart">
        <UserPreview user={friend} />
        <Button
          compact
          color="green"
          loading={isInviting}
          onClick={() => invite(friend.id)}
        >
          Invitar
        </Button>
      </Group>
    </Paper>
  );
};
