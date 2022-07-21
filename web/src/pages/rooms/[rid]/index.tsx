import React from 'react';
import { NextPage } from 'next';
import { useRoom } from '../../../features/rooms/queries';
import { Page } from '../../../layouts/Page';
import { Header } from '../../../layouts/Header';
import { Box, Center, Text } from '@mantine/core';
import { ChatInput } from '../../../features/rooms/ChatInput';
import { Chats } from '../../../features/rooms/Chats';
import { withAuthGSSP } from '../../../utils/withAuthGSSP';
import { Loader } from '../../../components/Loader';
import { BottomNav } from '../../../layouts/BottomNav';
import { RoomMenu } from '../../../features/rooms/RoomMenu';
import { GoBack } from '../../../components/GoBack';

const RoomPage: NextPage = () => {
  const { room, isLoading, isJoined } = useRoom();

  if (isLoading) {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  if (!room) {
    return (
      <>
        <Page>
          <GoBack message="La sala no existe" />
        </Page>
        <BottomNav />
      </>
    );
  }

  if (!isJoined) {
    return (
      <Page>
        <Center sx={{ height: '100%' }}>
          <Text>Uniéndose</Text>
        </Center>
      </Page>
    );
  }

  return (
    <Page>
      <Header title={room.name} Side={<RoomMenu room={room} />} />

      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        py={64}
      >
        <Box sx={{ flex: 1 }}>
          <Chats />
        </Box>

        <ChatInput />
      </Box>
    </Page>
  );
};

export default RoomPage;

export const getServerSideProps = withAuthGSSP();
