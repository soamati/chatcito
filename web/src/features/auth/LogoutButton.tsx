import React from 'react';
import api from '@/api';
import { Button } from '@mantine/core';
import { Logout } from 'tabler-icons-react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

export const LogoutButton = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(() => api.post('/auth/logout'), {
    onSuccess: () => {
      router.push('/');
    },
  });

  return (
    <Button
      variant="outline"
      color="red"
      size="xs"
      leftIcon={<Logout size={16} />}
      onClick={() => mutate()}
      loading={isLoading}
    >
      Salir
    </Button>
  );
};
