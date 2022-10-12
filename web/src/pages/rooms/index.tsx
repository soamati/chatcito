import React from 'react';
import { Box } from '@mantine/core';
import { Mobile } from '@/components/Mobile';
import { CreateRoomButton } from '@/features/rooms/CreateRoomButton';
import { Rooms } from '@/features/rooms/Rooms';
import { Page } from '@/layouts/Page';

const RoomsPage = () => {
  return (
    <>
      <Page headerTitle="Mis salas">
        <Box pb={64}>
          <Rooms />
        </Box>
      </Page>

      <Mobile>
        <CreateRoomButton />
      </Mobile>
    </>
  );
};

export default RoomsPage;
