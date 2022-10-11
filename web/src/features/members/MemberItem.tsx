import React from 'react';
import { Paper, Group, Button, Text } from '@mantine/core';
import { UserPreview } from '../../components/UserPreview';
import { parseDate } from '../../utils/date';
import { Member } from './types';
import { useKick } from './queries';

type Props = {
  member: Member;
  isOwner: boolean;
};

export const MemberItem = ({
  member: { user, memberSince },
  isOwner,
}: Props) => {
  const [kick, isKicking] = useKick();

  return (
    <Paper key={user.id} withBorder p="xs" radius={0}>
      <Group position="apart">
        <div>
          <UserPreview user={user} />
          <Text size="xs" color="gray" mt="xs">
            Miembro desde {parseDate(memberSince)}
          </Text>
        </div>

        <Button
          compact
          color="red"
          loading={isKicking}
          onClick={() => kick(user.id)}
          disabled={!isOwner}
        >
          Expulsar
        </Button>
      </Group>
    </Paper>
  );
};
