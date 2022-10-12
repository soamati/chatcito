import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Member } from './types';
import { useRoomId } from '@/features/rooms/useRoomId';
import api from '@/api';
import { UserRoomRelation } from '@/types';

export function useMembers() {
  const id = useRoomId();

  const { data, isLoading } = useQuery(['rooms', id, 'members'], () =>
    api.get<UserRoomRelation[]>(`/rooms/${id}/members`)
  );

  return [data, isLoading] as const;
}

export function useKick() {
  const roomId = useRoomId();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (memberId: string) => api.post(`/rooms/${roomId}/kick/${memberId}`),
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
