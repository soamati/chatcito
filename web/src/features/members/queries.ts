import { useMutation, useQuery, useQueryClient } from 'react-query';
import { trpc } from '../../lib/trpc';
import { useRoomId } from '../rooms/useRoomId';
import { Member } from './types';

export function useMembers() {
  const id = useRoomId();

  const { data, isLoading } = useQuery(['rooms', id, 'members'], () =>
    trpc.query('room.members', { id })
  );

  return [data, isLoading] as const;
}

export function useKick() {
  const roomId = useRoomId();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (memberId: string) => trpc.mutation('room.kick', { memberId, roomId }),
    {
      onSuccess(_, kickedId) {
        queryClient.setQueryData<Member[]>(
          ['rooms', roomId, 'members'],
          (prev) => {
            if (!prev) return [];

            return prev.filter(({ user }) => user.id !== kickedId);
          }
        );
      },
    }
  );

  return [mutate, isLoading] as const;
}
