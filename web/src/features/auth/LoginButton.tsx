import React from 'react';
import { Button } from '@mantine/core';
import { BrandGoogle } from 'tabler-icons-react';
import { useRouter } from 'next/router';

const authURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`;

export const LoginButton = () => {
  const router = useRouter();

  const onClick = React.useCallback(() => {
    router.push(authURL);
  }, [router]);

  return (
    <Button size="lg" leftIcon={<BrandGoogle size={18} />} onClick={onClick}>
      Entrar con Google
    </Button>
  );
};
