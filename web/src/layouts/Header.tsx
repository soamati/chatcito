import React from 'react';
import { ActionIcon, Group, Paper, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'tabler-icons-react';

type Props = {
  title?: string;
};

export const Header = ({ title = 'Chatcito' }: Props) => {
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
      <Group spacing="xs" p="xs" sx={{ minHeight: '64px' }}>
        <ActionIcon>
          <ArrowLeft onClick={() => router.back()} />
        </ActionIcon>
        <Title order={4}>{title}</Title>
      </Group>
    </Paper>
  );
};
