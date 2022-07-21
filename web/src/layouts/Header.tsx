import React from 'react';
import Link from 'next/link';
import { ActionIcon, Center, Group, Paper, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { ArrowLeft, Bell } from 'tabler-icons-react';

type Props = {
  title?: string;
  Side?: React.ReactNode;
};

export const Header = ({ title = 'Chatcito', Side }: Props) => {
  const router = useRouter();

  return (
    <Paper
      sx={{
        position: 'fixed',
        width: '100%',
        zIndex: 1,
      }}
      withBorder
    >
      <Group p="xs" sx={{ minHeight: '64px' }} position="apart">
        <Group spacing="xs">
          <ActionIcon>
            <ArrowLeft onClick={() => router.back()} />
          </ActionIcon>
          <Title order={4}>{title}</Title>
        </Group>

        {/* For menu */}
        <Center>
          {Side ?? (
            <Link href="/notifications" passHref>
              <ActionIcon size="lg" variant="transparent">
                <Bell size={24} />
              </ActionIcon>
            </Link>
          )}
        </Center>
      </Group>
    </Paper>
  );
};
