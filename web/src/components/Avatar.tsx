import React from 'react';
import { Avatar as _Avatar, MantineNumberSize } from '@mantine/core';
import { getInitials } from '../utils/getInitials';

type Props = {
  src?: string | null;
  alt?: string;
  size?: MantineNumberSize;
  name: string;
};

export const Avatar = ({ src, alt, name, size = 'sm' }: Props) => {
  return (
    <_Avatar
      src={src}
      alt={alt}
      radius="xl"
      size={size}
      imageProps={{ referrerPolicy: 'no-referrer' }}
    >
      {getInitials(name)}
    </_Avatar>
  );
};
