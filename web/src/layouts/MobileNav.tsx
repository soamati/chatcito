import React from 'react';
import { Box, Group, Stack, ActionIcon, Text, Paper } from '@mantine/core';
import { Rocket, HeartPlus, User, Icon } from 'tabler-icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavItemProps = {
  Icon: Icon;
  to: string;
  label: string;
};

const NavItem = ({ Icon, to, label }: NavItemProps) => {
  const router = useRouter();

  const isCurrentPage = React.useMemo(() => {
    return router.pathname === to;
  }, [router, to]);

  return (
    <Link href={to} passHref>
      <Stack
        spacing={0}
        align="center"
        justify="center"
        sx={{ flex: 1, cursor: 'pointer' }}
      >
        <ActionIcon
          size="lg"
          variant="transparent"
          color={isCurrentPage ? 'blue' : undefined}
        >
          <Icon size={24} />
        </ActionIcon>
        <Text size="sm" color={isCurrentPage ? 'blue' : undefined}>
          {label}
        </Text>
      </Stack>
    </Link>
  );
};

export const MobileNav = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 'auto 0 0 0',
      }}
    >
      <Paper radius={0} shadow="sm" withBorder>
        <Group position="apart" px="xl" py="xs">
          <NavItem Icon={Rocket} label="Salas" to="/rooms" />
          <NavItem Icon={HeartPlus} label="Amigos" to="/friends" />
          <NavItem Icon={User} label="Perfil" to="/profile" />
        </Group>
      </Paper>
    </Box>
  );
};
