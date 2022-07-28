import React from 'react';
import { Center, Paper, Stack, Text } from '@mantine/core';
import { Loader } from '../../components/Loader';
import { useFriends } from './queries';
import { UserPreview } from '../../components/UserPreview';

export const FriendList = () => {
  const [friends] = useFriends();

  if (!friends) {
    return <Loader />;
  }

  if (!friends.length) {
    return (
      <Center pt="xl">
        <Text>Todavía no tenés amigos</Text>
      </Center>
    );
  }

  return (
    <Stack spacing="xs">
      {friends.map((friend) => (
        <Paper key={friend.id} withBorder p="xs" radius={0}>
          <UserPreview key={friend.id} user={friend} />
        </Paper>
      ))}
    </Stack>
  );
};
