import React from 'react';
import { NextPage } from 'next';
import { Box, Center, Stack, Text, Title } from '@mantine/core';

const HelloPage: NextPage = () => {
  const [response, setResponse] = React.useState<any>(null);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('http://localhost:5000/users/me', {
          credentials: 'include',
        });
        console.log({ ok: res.ok });
        const data = await res.json();
        setResponse(data);
      } catch (meError) {
        console.log({ meError });
      }
    }
    fetchUser();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Center sx={{ flex: 1 }}>
        <Stack sx={{ alignItems: 'center' }}>
          <Title>Hello! 👋</Title>
          {response && <Text>{JSON.stringify(response)}</Text>}
        </Stack>
      </Center>
    </Box>
  );
};

export default HelloPage;
