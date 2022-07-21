import React from 'react';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { Logout } from 'tabler-icons-react';

const LOGOUT_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`;

export const LogoutButton = () => {
  const router = useRouter();

  const onClick = React.useCallback(() => {
    router.push(LOGOUT_URL);
  }, [router]);

  return (
    <Button
      variant="outline"
      color="red"
      size="xs"
      leftIcon={<Logout size={16} />}
      onClick={onClick}
    >
      Salir
    </Button>
  );
};
