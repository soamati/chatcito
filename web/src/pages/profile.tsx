import { Box, Center, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { Avatar } from '../components/Avatar';
import { LogoutButton } from '../features/auth/LogoutButton';
import { BottomNav } from '../layouts/BottomNav';
import { Header } from '../layouts/Header';
import { Page } from '../layouts/Page';
import { withAuthGSSP, WithUserProps } from '../utils/withAuthGSSP';

const ProfilePage = ({ user }: WithUserProps<{}>) => {
  return (
    <>
      <Header />
      <Page>
        <Box py={64}>
          <Center py="xl">
            <Stack align="center" spacing="xs">
              <Avatar src={user.image} name={user.name} size="xl" />
              <Title order={3}>{user.name}</Title>
              <Text color="gray">#{user.id.slice(-5)}</Text>

              <LogoutButton />
            </Stack>
          </Center>
        </Box>
      </Page>
      <BottomNav />
    </>
  );
};

export default ProfilePage;

export const getServerSideProps = withAuthGSSP();
