import React from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'tabler-icons-react';

const ToggleColorModeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon onClick={() => toggleColorScheme()}>
      {colorScheme === 'dark' ? <Sun /> : <Moon />}
    </ActionIcon>
  );
};

export default ToggleColorModeButton;
