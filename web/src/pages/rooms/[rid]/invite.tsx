import React from 'react';
import { Center, Loader, Stack } from '@mantine/core';
import { GoBack } from '@/components/GoBack';
import { useFriends } from '@/features/friendships/queries';
import { InviteItem } from '@/features/invitations/InviteItem';
import { useRoom } from '@/features/rooms/queries';
import { Page } from '@/layouts/Page';

const InvitePage = () => {
  const { room, isLoading } = useRoom();
  const [friends] = useFriends();

  if (isLoading || !friends) {
    return (
      <Page>
        <Center sx={{ height: '100%' }}>
          <Loader />
        </Center>
      </Page>
    );
  }

  if (!room) {
    return (
      <Page>
        <GoBack message="La sala no existe" />
      </Page>
    );
  }

  if (!room.isOwner) {
    return (
      <Page>
        <GoBack
          message="Solo el dueño de la sala puede enviar invitaciones"
          goBack={`/rooms/${room.id}`}
        />
      </Page>
    );
  }

  return (
    <Page headerTitle={`Invitar a ${room.name}`}>
      <Stack mt="xs" spacing="xs">
        {friends.map((friend) => (
          <InviteItem key={friend.id} friend={friend} />
        ))}
      </Stack>
    </Page>
  );
};

export default InvitePage;
