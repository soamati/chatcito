import { Box } from '@mantine/core';
import React from 'react';
import { GoBack } from '../../../components/GoBack';
import { Loader } from '../../../components/Loader';
import { MemberList } from '../../../features/members/MemberList';
import { useRoom } from '../../../features/rooms/queries';
import { BottomNav } from '../../../layouts/BottomNav';
import { Header } from '../../../layouts/Header';
import { Page } from '../../../layouts/Page';
import { withAuthGSSP, WithUserProps } from '../../../utils/withAuthGSSP';

const MembersPage = ({ user }: WithUserProps<{}>) => {
  const { room, isLoading } = useRoom();

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

  return (
    <>
      <Header title={`Integrantes de ${room.name}`} />

      <Page>
        <Box py={64} sx={{ height: '100%' }}>
          <MemberList owner={room.owner} isOwner={room.isOwner} />
        </Box>
      </Page>

      <BottomNav />
    </>
  );
};

export default MembersPage;

export const getServerSideProps = withAuthGSSP();
