import React from 'react';
import Link from 'next/link';
import { Center, Stack, Text } from '@mantine/core';

type Props = {
  message?: string;
  goBack?: string;
};

export const GoBack = ({
  message = 'No encontramos lo que buscabas',
  goBack = '/home',
}: Props) => {
  return (
    <Center sx={{ height: '100%' }}>
      <Stack align="center" spacing="xs">
        <Text>{message}</Text>
        <Link href={goBack} passHref>
          <Text variant="link" sx={{ cursor: 'pointer' }}>
            Volver
          </Text>
        </Link>
      </Stack>
    </Center>
  );
};
