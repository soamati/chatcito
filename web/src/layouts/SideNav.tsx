import React from 'react';
import Link from 'next/link';
import { ActionIcon, Center, Stack, Tooltip } from '@mantine/core';
import { HeartPlus, Home, Icon, Plus, Rocket } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { Avatar } from '../components/Avatar';
import { useAuthUser } from '../hooks/useAuthUser';

type ItemProps = {
  Icon: Icon;
  to: string;
  label: string;
};

const SideNavItem = ({ Icon, to, label }: ItemProps) => {
  const router = useRouter();

  return (
    <Link href={to} passHref>
      <Tooltip label={label}>
        <ActionIcon
          size="xl"
          radius="xl"
          color={router.pathname === to ? 'blue' : 'gray'}
        >
          <Icon />
        </ActionIcon>
      </Tooltip>
    </Link>
  );
};

export const SideNav = () => {
  const [user] = useAuthUser();

  return (
    <Stack p="xs" justify="space-between" sx={{ height: '100%' }}>
      <Stack>
        <SideNavItem Icon={Home} to="/home" label="Hola!" />
        <SideNavItem Icon={Rocket} to="/rooms" label="Salas" />
        <SideNavItem Icon={HeartPlus} to="/friends" label="Amigos" />

        <Tooltip label="Crear sala">
          <ActionIcon size="xl" radius="xl" variant="filled" color="blue">
            <Plus />
          </ActionIcon>
        </Tooltip>
      </Stack>

      {user && (
        <Link href="/profile" passHref>
          <Tooltip label="Perfil">
            <Center sx={{ cursor: 'pointer' }}>
              <Avatar
                name={user.name}
                src={user.image}
                alt={user.name}
                size="md"
              />
            </Center>
          </Tooltip>
        </Link>
      )}
    </Stack>
  );
};
