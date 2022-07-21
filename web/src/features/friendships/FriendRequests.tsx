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
      <Center sx={{ height: '100%' }}>
        <Text>No hay solicitudes</Text>
      </Center>
    );
  }

  return (
    <Stack m="md">
      {possibleFriends.map((friend) => (
        <PossibleFriend key={friend.id} user={friend} />
      ))}
    </Stack>
  );
};
