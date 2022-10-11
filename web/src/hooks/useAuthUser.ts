import { useQuery } from 'react-query';
import { trpc } from '../lib/trpc';

export function useAuthUser() {
  const { data, isLoading } = useQuery(['user'], () => trpc.query('user.auth'));

  return [data, isLoading] as const;
}
