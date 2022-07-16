import React from 'react';
import {
  Avatar,
  Group,
  Stack,
  Text,
  Title,
  Box,
  createStyles,
  Divider,
} from '@mantine/core';
import { Rocket } from 'tabler-icons-react';
import { useRooms } from './queries';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  badge: {
    backgroundColor: theme.colors.red[8],
    borderRadius: '100%',
    aspectRatio: '1 / 1',
    height: '1.25rem',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const Rooms = () => {
  const { classes } = useStyles();
  const [rooms] = useRooms();

  if (!rooms) return null;

  return (
    <div>
      {rooms.map((room) => (
        <div key={room.id}>
          <Link href={`/rooms/${room.id}`} passHref>
            <Group py="xs" px="sm" position="apart" sx={{ cursor: 'pointer' }}>
              <Group spacing="xs">
                <Avatar color="blue" radius="xl">
                  <Rocket />
                </Avatar>
                <div>
                  <Title order={4}>{room.name}</Title>
                  <Text>No hay mensajes</Text>
                </div>
              </Group>

              <Stack spacing={4} align="end">
                {/* Last message time */}
                <Text size="sm">11:20 AM</Text>

                {/* Unread messages count */}
                <Box className={classes.badge}>
                  <Text size="xs" weight="bold">
                    10
                  </Text>
                </Box>
              </Stack>
            </Group>
          </Link>
          <Divider />
        </div>
      ))}
    </div>
  );
};
