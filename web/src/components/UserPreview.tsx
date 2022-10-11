import React from 'react';
import { Group, Text } from '@mantine/core';
import { Avatar } from './Avatar';
import { ExcludeNull, InferQueryOutput } from '../types';

type Props = {
  user: ExcludeNull<InferQueryOutput<'user.auth'>>;
};

export const UserPreview = ({ user }: Props) => {
  return (
    <Group spacing="xs">
      <Avatar src={user.image} alt={user.name} name={user.name} size="md" />
      <div>
        <Text size="lg" weight="bold">
          {user.name}
        </Text>
        <Text size="xs" color="dimmed">
          #{user.id.slice(-5)}
        </Text>
      </div>
    </Group>
  );
};
