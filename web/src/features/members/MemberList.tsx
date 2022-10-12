import React from 'react';
import { Badge, Group, Paper, Stack } from '@mantine/core';
import { User } from '@/types';
import { UserPreview } from '@/components/UserPreview';
import { MemberItem } from './MemberItem';
import { useMembers } from './queries';

type Props = {
  isOwner: boolean;
  owner: User;
};

export const MemberList = ({ isOwner, owner }: Props) => {
  const [members] = useMembers();

  if (!members) {
    return null;
  }

  return (
    <Stack mt="xs" spacing="xs">
      <Paper withBorder p="xs" radius={0}>
        <Group position="apart">
          <UserPreview user={owner} />
          <Badge size="sm" color="green">
            admin
          </Badge>
        </Group>
      </Paper>
      {members.map((member) => (
        <MemberItem key={member.user.id} member={member} isOwner={isOwner} />
      ))}
    </Stack>
  );
};
