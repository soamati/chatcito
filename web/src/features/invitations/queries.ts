import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TReceivedInvitation } from './types';
import { useRoomId } from '@/features/rooms/useRoomId';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import api from '@/api';
import { Invitation } from '@/types';

export function useInvite() {
  const roomId = useRoomId();
  const handler = useErrorHandler();

  const { mutate, isLoading } = useMutation(
    (targetId: string) =>
      api.post<Invitation>('/invitations/send', { targetId, roomId }),
    {
      onSuccess() {
        showNotification({
          title: 'Genial! 👍',
          message: 'Invitación enviada',
        });
      },
      onError(error) {
        handler(error);
      },
    }
  );

  return [mutate, isLoading] as const;
}

export function useReceivedInvitations() {
  const { data, isLoading } = useQuery(['invitations'], () =>
    api.get<Invitation[]>('/invitations/received')
  );

  return [data, isLoading] as const;
}

export function useAccept() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    (invitationId: string) =>
      api.post<{ roomId: string }>(`/invitations/accept/${invitationId}`),
    {
      onSuccess({ roomId }, invitationId) {
        queryClient.setQueryData<TReceivedInvitation[]>(
          ['invitations'],
          (prev) => {
            if (!prev) return [];

            return prev.filter((invitation) => invitation.id !== invitationId);
          }
        );

        router.push(`/rooms/${roomId}`);
      },
    }
  );

  return [mutate, isLoading] as const;
}

export function useReject() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (invitationId: string) => api.delete(`/invitations/${invitationId}`),
    {
      onSuccess(_, invitationId) {
        queryClient.setQueryData<TReceivedInvitation[]>(
          ['invitations'],
          (prev) => {
            if (!prev) return [];

            return prev.filter((invitation) => invitation.id !== invitationId);
          }
        );
      },
    }
  );

  return [mutate, isLoading] as const;
}
