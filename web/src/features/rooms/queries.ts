import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRoomId } from './useRoomId';
import api from '@/api';
import { Chat, Room } from '@/types';

type RoomsWithCounters = Room & {
  _count: {
    chats: number;
    members: number;
  };
};

export function useCreateRoom() {
  const router = useRouter();

  return useMutation(() => api.post<Room>('/rooms'), {
    onSuccess: ({ id }) => {
      router.push(`/rooms/${id}`);
    },
  });
}

export function useRooms() {
  const { data, isLoading } = useQuery(['rooms'], () =>
    api.get<RoomsWithCounters[]>('/rooms')
  );

  return [data, isLoading] as const;
}

export function useRoom() {
  const router = useRouter();

  const id = React.useMemo(() => {
    const { rid } = router.query;
    return typeof rid === 'string' ? rid : '';
  }, [router]);

  const { data: room, isLoading } = useQuery(['rooms', id], () =>
    api.get<Room>(`/rooms/${id}`)
  );

  return { room, isLoading } as const;
}

export function useChats() {
  const rid = useRoomId();

  const { data, isLoading } = useQuery(['rooms', rid, 'chats'], () =>
    api.get<Chat[]>(`/rooms/${rid}/chats`)
  );

  return [data, isLoading] as const;
}

export function useUpdateRoom() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (data: { id: string; name: string }) => api.patch<Room>('/rooms', data),
    {
      onSuccess(updated) {
        let shouldInvalidate = false;

        queryClient.setQueryData<Room | null>(['rooms', updated.id], (old) => {
          if (!old) {
            shouldInvalidate = true;
            return null;
          }
          return { ...old, ...updated };
        });

        if (!shouldInvalidate) return;

        queryClient.invalidateQueries(['rooms', updated.id]);
      },
    }
  );

  return [mutate, isLoading] as const;
}

export function useLeaveRoom() {
  const router = useRouter();
  const roomId = useRoomId();

  const { mutate, isLoading } = useMutation(
    () => api.post(`/rooms/${roomId}/leave`),
    {
      onSuccess() {
        router.push('/home');
      },
    }
  );

  return [mutate, isLoading] as const;
}
