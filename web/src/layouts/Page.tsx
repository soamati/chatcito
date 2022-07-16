import React, { PropsWithChildren } from 'react';
import { Box } from '@mantine/core';

export const Page = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
};
