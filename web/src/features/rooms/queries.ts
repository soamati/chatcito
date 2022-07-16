import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { trpc } from '../../lib/trpc';
import { useRoomId } from './useRoomId';

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
  const router = useRouter();

  const id = React.useMemo(() => {
    const { rid } = router.query;
    return typeof rid === 'string' ? rid : '';
  }, [router]);

  const { data, isLoading } = useQuery(['rooms', id], () =>
    trpc.query('room.byId', { id })
  );

  return [data, isLoading] as const;
}

export function useChats() {
  const rid = useRoomId();

  const { data, isLoading } = useQuery(['rooms', rid, 'chats'], () => {
    return trpc.query('room.chats', { id: rid });
  });

  return [data, isLoading] as const;
}
