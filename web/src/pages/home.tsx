import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { withAuthGSSP } from '../utils/withAuthGSSP';
import { Page } from '../layouts/Page';
import {
  Button,
  Center,
  List,
  ListItem,
  Stack,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { Heart, MessageCircle, Rocket } from 'tabler-icons-react';

const Home: NextPage = () => {
  return (
    <Page>
      <Center sx={{ height: '100%' }}>
        <Stack align="center">
          <Title order={3}>Bienvenido a Chatcito!</Title>

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

          <Link href="/rooms" passHref>
            <Button size="lg" radius="xl" mt="md">
              Empezar
            </Button>
          </Link>
        </Stack>
      </Center>
    </Page>
  );
};

export default Home;

export const getServerSideProps = withAuthGSSP();
