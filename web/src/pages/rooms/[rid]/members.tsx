import React from 'react';
import { GoBack } from '../../../components/GoBack';
import { Loader } from '../../../components/Loader';
import { MemberList } from '../../../features/members/MemberList';
import { useRoom } from '../../../features/rooms/queries';
import { Page } from '../../../layouts/Page';
import { withAuthGSSP } from '../../../utils/withAuthGSSP';

const MembersPage = () => {
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
      <Page>
        <GoBack message="La sala no existe" />
      </Page>
    );
  }

  return (
    <Page headerTitle={`Integrantes de ${room.name}`}>
      <MemberList owner={room.owner} isOwner={room.isOwner} />
    </Page>
  );
};

export default MembersPage;

export const getServerSideProps = withAuthGSSP();
