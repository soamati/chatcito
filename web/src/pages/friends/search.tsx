import React from 'react';
import { NextPage } from 'next';
import { Page } from '../../layouts/Page';
import { Header } from '../../layouts/Header';
import { useAllUsers } from '../../features/users/queries';
import { Box, Stack } from '@mantine/core';
import { BottomNav } from '../../layouts/BottomNav';
import { PossibleFriend } from '../../features/friendships/PossibleFriend';

const SearchPage: NextPage = () => {
  const [users] = useAllUsers();

  return (
    <>
      <Header title="Buscar amigos" />

      <Page>
        <Box py={64}>
          <Stack m="md">
            {users?.map((user) => (
              <PossibleFriend key={user.id} user={user} />
            ))}
          </Stack>
        </Box>
      </Page>

      <BottomNav />
    </>
  );
};

export default SearchPage;
