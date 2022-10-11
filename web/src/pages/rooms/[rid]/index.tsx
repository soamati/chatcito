import React from 'react';
import { NextPage } from 'next';
import { useRoom } from '../../../features/rooms/queries';
import { Page } from '../../../layouts/Page';
import { Box, Center, ScrollArea, Text } from '@mantine/core';
import { ChatInput } from '../../../features/rooms/ChatInput';
import { Chats } from '../../../features/rooms/Chats';
import { withAuthGSSP } from '../../../utils/withAuthGSSP';
import { Loader } from '../../../components/Loader';
import { GoBack } from '../../../components/GoBack';
import { useJoinRoom } from '../../../features/rooms/useJoinRoom';
import { useScroll } from '../../../hooks/useScroll';
import { RoomMenu } from '../../../features/rooms/RoomMenu';

const RoomPage: NextPage = () => {
  const { ref, toBottom } = useScroll();
  const { room, isLoading } = useRoom();
  const { join, isJoined } = useJoinRoom();

  React.useEffect(() => {
    if (!room) return;

    join(room.id);
  }, [room, join]);

  if (isLoading) {
    return (
      <Page>
        <Loader />
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
    <Page
      headerTitle={room.name}
      HeaderSide={<RoomMenu room={room} />}
      showBottomNav={false}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flex: 1, position: 'relative' }}>
          <ScrollArea
            scrollbarSize={8}
            style={{ position: 'absolute', inset: 0 }}
            viewportRef={ref}
          >
            <Chats scrollToBottom={toBottom} />
          </ScrollArea>
        </Box>

        <ChatInput />
      </Box>
    </Page>
  );
};

export default RoomPage;

export const getServerSideProps = withAuthGSSP();
