import React from 'react';
import {
  Avatar,
  Group,
  Stack,
  Text,
  Title,
  Paper,
  useMantineTheme,
  Badge,
  Center,
} from '@mantine/core';
import { MessageCircle, Rocket, User } from 'tabler-icons-react';
import { useRooms } from './queries';
import Link from 'next/link';

export const Rooms = () => {
  const [rooms] = useRooms();
  const { colors } = useMantineTheme();

  if (!rooms) return null;

  if (!rooms.length) {
    return (
      <Center sx={{ height: '100%' }} pt={20}>
        <Text>Aún no estás en ninguna sala</Text>
      </Center>
    );
  }

  return (
    <Stack spacing="xs" mt="xs">
      {rooms.map((room) => (
        <Paper key={room.id} withBorder radius={0}>
          <Link href={`/rooms/${room.id}`} passHref>
            <Group
              py="xs"
              px="sm"
              position="apart"
              sx={{ cursor: 'pointer' }}
              noWrap
            >
              <Group spacing="xs" noWrap>
                <Avatar color="blue" radius="xl">
                  <Rocket />
                </Avatar>
                <div>
                  <Group spacing="xs">
                    <Title order={4}>{room.name}</Title>
                    {room.isOwner && (
                      <Badge size="sm" color="teal">
                        admin
                      </Badge>
                    )}
                  </Group>
                  <Text lineClamp={1} color="gray">
                    {room.chats.length > 0
                      ? room.chats[0].content
                      : 'No hay mensajes'}
                  </Text>
                </div>
              </Group>

              <Stack spacing={0} align="end">
                <Group spacing="xs">
                  <Text color={colors.green[4]}>{room._count.members + 1}</Text>
                  <User size={16} color={colors.green[4]} />
                </Group>
                <Group spacing="xs">
                  <Text color={colors.blue[4]}>{room._count.chats}</Text>
                  <MessageCircle size={16} color={colors.blue[4]} />
                </Group>
              </Stack>
            </Group>
          </Link>
        </Paper>
      ))}
    </Stack>
  );
};
