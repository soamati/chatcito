import React from 'react';
import Link from 'next/link';
import { ActionIcon, Center, Group, Paper, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { ArrowLeft, Bell } from 'tabler-icons-react';
import ToggleColorModeButton from '../components/ToggleColorModeButton';

type Props = {
  title?: string;
  Side?: React.ReactNode;
};

export const Header = ({ title = 'Chatcito', Side }: Props) => {
  const router = useRouter();

  return (
    <Paper withBorder radius={0} sx={{ borderBottom: 'none' }}>
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
            <Group>
              <ToggleColorModeButton />

              <Link href="/notifications" passHref>
                <ActionIcon size="lg" variant="transparent">
                  <Bell size={24} />
                </ActionIcon>
              </Link>
            </Group>
          )}
        </Center>
      </Group>
    </Paper>
  );
};
