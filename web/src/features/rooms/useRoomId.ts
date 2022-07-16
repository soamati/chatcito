import { useRouter } from 'next/router';

export function useRoomId() {
  const router = useRouter();

  return typeof router.query.rid === 'string' ? router.query.rid : '';
}
