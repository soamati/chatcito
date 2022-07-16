import React from 'react';
import { NextPage } from 'next';
import { useRoom } from '../../features/rooms/queries';
import { Page } from '../../layouts/Page';
import { Header } from '../../layouts/Header';
import { Box } from '@mantine/core';
import { ChatInput } from '../../features/rooms/ChatInput';
import { useJoinRoom } from '../../features/rooms/useJoinRoom';
import { Chats } from '../../features/rooms/Chats';

const RoomPage: NextPage = () => {
  const [room, isLoading] = useRoom();
  const { isJoined } = useJoinRoom();

  if (isLoading) {
    return <div>cargando...</div>;
  }

  if (!room) {
    return <div>la sala no existe</div>;
  }

  if (!isJoined) {
    return <div>uniéndose...</div>;
  }

  return (
    <Page>
      <Header title={room.name} />

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
