import React from 'react';
import type { NextPage } from 'next';
import { Box, Center, Group, Paper, Stack, Title } from '@mantine/core';
import { withAuthGSSP } from '../utils/withAuthGSSP';
import { LoginButton } from '../features/auth/LoginButton';

const Home: NextPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Center sx={{ flex: 1 }}>
        <Paper
          shadow="xs"
          p="md"
          sx={(theme) => ({ backgroundColor: theme.colors.dark[8] })}
        >
          <Stack spacing="xl">
            <Title order={3}>Bienvenido</Title>
            <LoginButton />
          </Stack>
        </Paper>
      </Center>

      <Group position="center" p="md">
        <Title order={2}>chatcito</Title>
      </Group>
    </Box>
  );
};

export default Home;

export const getServerSideProps = withAuthGSSP();
