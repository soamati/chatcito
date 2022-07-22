import { Box } from '@mantine/core';
import React from 'react';
import { CreateRoomButton } from '../../features/rooms/CreateRoomButton';
import { Rooms } from '../../features/rooms/Rooms';
import { BottomNav } from '../../layouts/BottomNav';
import { Header } from '../../layouts/Header';
import { Page } from '../../layouts/Page';
import { withAuthGSSP } from '../../utils/withAuthGSSP';

const RoomsPage = () => {
  return (
    <>
      <Header title="Mis salas" />

      <Page>
        <Box py={64}>
          <Rooms />
        </Box>
      </Page>

      <CreateRoomButton />
      <BottomNav />
    </>
  );
};

export default RoomsPage;

export const getServerSideProps = withAuthGSSP();
