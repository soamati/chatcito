import { Center, Loader as MLoader } from '@mantine/core';

export const Loader = () => {
  return (
    <Center sx={{ height: '100%' }}>
      <MLoader variant="dots" />
    </Center>
  );
};
