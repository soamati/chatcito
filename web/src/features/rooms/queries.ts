import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { trpc } from '../../lib/trpc';
import { useRoomId } from './useRoomId';
import { useJoinRoom } from './useJoinRoom';
import { InferMutationInput } from '../../types';
import { Room } from './types';

export function useCreateRoom() {
  const router = useRouter();

  return useMutation(() => trpc.mutation('room.create'), {
    onSuccess: ({ id }) => {
      router.push(`/rooms/${id}`);
    },
  });
}

export function useRooms() {
  const { data, isLoading } = useQuery(['rooms'], () =>
    trpc.query('room.list', { onlyMine: true })
  );

  return [data, isLoading] as const;
}

export function useRoom() {
  const { join, isJoined } = useJoinRoom();
  const router = useRouter();

  const id = React.useMemo(() => {
    const { rid } = router.query;
    return typeof rid === 'string' ? rid : '';
  }, [router]);

  const { data: room, isLoading } = useQuery(
    ['rooms', id],
    () => trpc.query('room.byId', { id }),
    {
      onSuccess(room) {
        if (!room) return;
        join();
      },
    }
  );

  return { room, isLoading, isJoined } as const;
}

export function useChats() {
  const rid = useRoomId();

  const { data, isLoading } = useQuery(['rooms', rid, 'chats'], () => {
    return trpc.query('room.chats', { id: rid });
  });

  return [data, isLoading] as const;
}

export function useUpdateRoom() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ({ id, name }: InferMutationInput<'room.update'>) =>
      trpc.mutation('room.update', { id, name }),
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
