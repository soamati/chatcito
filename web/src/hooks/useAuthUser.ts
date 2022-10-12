import api from '@/api';
import { User } from '@/types';
import { useQuery } from 'react-query';

export function useAuthUser() {
  const { data, isLoading } = useQuery(['user'], () =>
    api.get<User>('/users/me')
  );

  return [data, isLoading] as const;
}
