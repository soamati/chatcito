import React from 'react';
import Link from 'next/link';
import { Button, Group } from '@mantine/core';
import { FriendList } from '@/features/friendships/FriendList';
import { Page } from '@/layouts/Page';

const FriendsPage = () => {
  return (
    <Page headerTitle="Amigos">
      <Group m="md" position="left">
        <Link href="/friends/search" passHref>
          <Button variant="outline">Buscar amigos</Button>
        </Link>

        <Link href="/friends/requests" passHref>
          <Button variant="subtle">Solicitudes</Button>
        </Link>
      </Group>

      <FriendList />
    </Page>
  );
};

export default FriendsPage;
