import React from 'react';
import { NextPage } from 'next';
import { Page } from '../../layouts/Page';
import { useAllUsers } from '../../features/users/queries';
import { Input, Stack } from '@mantine/core';
import { PossibleFriend } from '../../features/friendships/PossibleFriend';
import { InferQueryOutput } from '../../types';
import { useFilter } from '../../hooks/useFilter';

type User = InferQueryOutput<'user.all'>[number];

function filterUsers(filter: string) {
  return (user: User) => {
    return user.name.toLowerCase().includes(filter);
  };
}

const SearchPage: NextPage = () => {
  const [users] = useAllUsers();

  const { filtered, getInputProps } = useFilter(users, filterUsers);

  return (
    <Page headerTitle="Buscar amigos">
      <Stack mt="xs" spacing="xs">
        <Input
          placeholder="Busca por nombre..."
          size="md"
          variant="filled"
          radius={0}
          {...getInputProps()}
        />
        {filtered.map((user) => (
          <PossibleFriend key={user.id} user={user} />
        ))}
      </Stack>
    </Page>
  );
};

export default SearchPage;
