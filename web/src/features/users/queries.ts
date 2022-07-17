import { useQuery } from 'react-query';
import { trpc } from '../../lib/trpc';

export function useAllUsers() {
  const { data } = useQuery(['users'], () =>
    trpc.query('user.all', { notMe: true })
  );

  return [data];
}
