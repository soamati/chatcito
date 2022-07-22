import React from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { MoodSmile, Pencil, Settings, UserPlus } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { useBoolean } from '../../hooks/useBoolean';
import { Room } from './types';
import { ChangeNameModal } from './ChangeNameModal';

type Props = {
  room: Room;
};

export const RoomMenu = ({ room }: Props) => {
  const router = useRouter();
  const { value: opened, off, toggle } = useBoolean(false);

  const handleRedirect = React.useCallback(
    (destination: string) => {
      router.push(`/rooms/${room.id}${destination}`);
    },
    [room, router]
  );

  return (
    <>
      <Menu
        mr="xs"
        control={
          <ActionIcon variant="hover" color="gray">
            <Settings />
          </ActionIcon>
        }
      >
        <Menu.Item icon={<Pencil size={14} />} onClick={toggle}>
          Cambiar nombre
        </Menu.Item>
        <Menu.Item
          icon={<MoodSmile size={14} />}
          onClick={() => handleRedirect('/members')}
        >
          Miembros
        </Menu.Item>
        <Menu.Item
          icon={<UserPlus size={14} />}
          onClick={() => handleRedirect('/invite')}
          color="teal"
        >
          Invitar
        </Menu.Item>
      </Menu>

      <ChangeNameModal room={room} isOpen={opened} onClose={off} />
    </>
  );
};
