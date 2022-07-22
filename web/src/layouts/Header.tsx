import React from 'react';
import Link from 'next/link';
import { ActionIcon, Center, Group, Paper, Text } from '@mantine/core';
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
      <Group p="xs" sx={{ minHeight: '64px' }} position="apart" noWrap>
        <Group spacing="xs" noWrap>
          <ActionIcon>
            <ArrowLeft onClick={() => router.back()} />
          </ActionIcon>
          <Text size="lg" weight="bold" lineClamp={1}>
            {title}
          </Text>
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
