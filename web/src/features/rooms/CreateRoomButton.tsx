import React from 'react';
import { Affix, Button } from '@mantine/core';
import { Rocket } from 'tabler-icons-react';
import { useCreateRoom } from './queries';

export const CreateRoomButton = () => {
  const { mutate, isLoading } = useCreateRoom();

  return (
    <Affix position={{ bottom: 96, right: 18 }}>
      <Button
        leftIcon={<Rocket />}
        onClick={() => mutate()}
        loading={isLoading}
        radius="lg"
      >
        Nueva
      </Button>
    </Affix>
  );
};
