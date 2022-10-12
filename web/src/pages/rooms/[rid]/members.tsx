import React from 'react';
import { GoBack } from '@/components/GoBack';
import { MemberList } from '@/features/members/MemberList';
import { useRoom } from '@/features/rooms/queries';
import { Page } from '@/layouts/Page';
import { Center, Loader } from '@mantine/core';

const MembersPage = () => {
  const { room, isLoading } = useRoom();

  if (isLoading) {
    return (
      <Page full>
        <Center sx={{ flex: 1 }}>
          <Loader />
        </Center>
      </Page>
    );
  }

  if (!room) {
    return (
      <Page full>
        <Center sx={{ flex: 1 }}>
          <GoBack message="La sala no existe" />
        </Center>
      </Page>
    );
  }

  return (
    <Page headerTitle={`Integrantes de ${room.name}`}>
      <MemberList owner={room.owner} isOwner={room.isOwner ?? false} />
    </Page>
  );
};

export default MembersPage;
