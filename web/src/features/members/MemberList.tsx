import React from 'react';
import { Badge, Group, Paper, Stack } from '@mantine/core';
import { Loader } from '../../components/Loader';
import { useMembers } from './queries';
import { MemberItem } from './MemberItem';
import { ExcludeNull, InferQueryOutput } from '../../types';
import { UserPreview } from '../../components/UserPreview';

type Props = {
  isOwner: boolean;
  owner: ExcludeNull<InferQueryOutput<'room.byId'>>['owner'];
};

export const MemberList = ({ isOwner, owner }: Props) => {
  const [members] = useMembers();

  if (!members) {
    return <Loader />;
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
