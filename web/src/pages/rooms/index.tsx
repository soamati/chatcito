import React from 'react';
import { CreateRoomButton } from '../../features/rooms/CreateRoomButton';
import { Rooms } from '../../features/rooms/Rooms';
import { BottomNav } from '../../layouts/BottomNav';
import { Page } from '../../layouts/Page';
import { withAuthGSSP } from '../../utils/withAuthGSSP';

type Props = {};

const RoomsPage = (props: Props) => {
  return (
    <>
      <Page>
        <Rooms />
        <BottomNav />
      </Page>

      <CreateRoomButton />
    </>
  );
};

export default RoomsPage;

export const getServerSideProps = withAuthGSSP();
