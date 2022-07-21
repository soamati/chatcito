import React from 'react';
import { Button, Menu } from '@mantine/core';
import { MoodSmile, UserPlus } from 'tabler-icons-react';
import { ExcludeNull, InferQueryOutput } from '../../types';
import { useRouter } from 'next/router';

type Props = {
  room: ExcludeNull<InferQueryOutput<'room.byId'>>;
};

export const RoomMenu = ({ room }: Props) => {
  const router = useRouter();

  const handleRedirect = React.useCallback(
    (destination: string) => {
      router.push(`/rooms/${room.id}${destination}`);
    },
    [room, router]
  );

  return (
    <Menu
      mr="xs"
      control={
        <Button variant="subtle" size="md" compact>
          Menú
        </Button>
      }
    >
      <Menu.Item
        icon={<MoodSmile size={14} />}
        onClick={() => handleRedirect('/members')}
      >
        Miembros
      </Menu.Item>
      <Menu.Item
        icon={<UserPlus size={14} />}
        onClick={() => handleRedirect('/invite')}
      >
        Invitar
      </Menu.Item>
    </Menu>
  );
};
