import React from 'react';
import { useFriendRequests } from './queries';
import { Loader } from '../../components/Loader';
import { Center, Stack, Text } from '@mantine/core';
import { PossibleFriend } from './PossibleFriend';

export const FriendRequests = () => {
  const [possibleFriends] = useFriendRequests();

  if (!possibleFriends) {
    return <Loader />;
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
        <PossibleFriend key={friend.id} user={friend} />
      ))}
    </Stack>
  );
};
