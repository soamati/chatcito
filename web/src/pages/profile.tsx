import React from 'react';
import { Center, Stack, Text, Title } from '@mantine/core';
import { LogoutButton } from '@/features/auth/LogoutButton';
import { Page } from '@/layouts/Page';
import { Avatar } from '@/components/Avatar';
import { useAuthUser } from '@/hooks/useAuthUser';

const ProfilePage = () => {
  const [user] = useAuthUser();

  if (!user) return null;

  return (
    <Page headerTitle="Perfil">
      <Center py="xl">
        <Stack align="center" spacing="xs">
          <Avatar src={user.image} name={user.name} size="xl" />
          <Title order={3}>{user.name}</Title>
          <Text color="gray">#{user.id.slice(-5)}</Text>

          <LogoutButton />
        </Stack>
      </Center>
    </Page>
  );
};

export default ProfilePage;
