import React from 'react';
import { useFriendRequests } from './queries';
import { Center, Stack, Text } from '@mantine/core';
import { PossibleFriendItem } from './PossibleFriend';

export const FriendRequests = () => {
  const [possibleFriends] = useFriendRequests();

  if (!possibleFriends) {
    return null;
  }

  if (!possibleFriends.length) {
    return (
      <Center pt="xl">
        <Text>No hay solicitudes</Text>
      </Center>
    );
  }

  return (
    <Stack mt="xs" spacing="xs">
      {possibleFriends.map((friend) => (
        <PossibleFriendItem key={friend.id} user={friend} />
      ))}
    </Stack>
  );
};
