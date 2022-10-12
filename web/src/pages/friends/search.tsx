import React from 'react';
import { NextPage } from 'next';
import { Input, Stack } from '@mantine/core';
import { User } from '@/types';
import { useFilter } from '@/hooks/useFilter';
import { PossibleFriendItem } from '@/features/friendships/PossibleFriend';
import { Page } from '@/layouts/Page';
import { usePossibleFriends } from '@/features/friendships/queries';
import { withAuthGSSP } from '@/utils/withAuthGSSP';

function filterUsers(filter: string) {
  return (user: User) => {
    return user.name.toLowerCase().includes(filter);
  };
}

const SearchPage: NextPage = () => {
  const [users] = usePossibleFriends();

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
          <PossibleFriendItem key={user.id} user={user} />
        ))}
      </Stack>
    </Page>
  );
};

export default SearchPage;

export const getServerSideProps = withAuthGSSP();
