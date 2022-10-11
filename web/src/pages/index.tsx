import React from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Center,
  Group,
  List,
  ListItem,
  Paper,
  Stack,
  ThemeIcon,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { Rocket, Heart, MessageCircle } from 'tabler-icons-react';
import { LoginButton } from '@/features/auth/LoginButton';

const Home: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Center sx={{ flex: 1 }}>
        <Paper
          shadow="xs"
          p="md"
          sx={(theme) => ({
            backgroundColor:
              colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[1],
          })}
        >
          <Stack align="center" spacing="xl">
            <Title order={3}>Bienvenido</Title>

            <List size="lg" spacing="xs">
              <ListItem
                icon={
                  <ThemeIcon radius="xl" color="green">
                    <Rocket size={16} />
                  </ThemeIcon>
                }
              >
                Creá salas
              </ListItem>
              <ListItem
                icon={
                  <ThemeIcon radius="xl" color="pink">
                    <Heart size={16} />
                  </ThemeIcon>
                }
              >
                Invitá amigos
              </ListItem>
              <ListItem
                icon={
                  <ThemeIcon radius="xl" color="yellow">
                    <MessageCircle size={16} />
                  </ThemeIcon>
                }
              >
                Chateá
              </ListItem>
            </List>

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
