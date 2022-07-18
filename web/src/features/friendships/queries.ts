import { useMutation } from 'react-query';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { trpc } from '../../lib/trpc';

export function useSendRequest() {
  const { mutate, isLoading } = useMutation((receiverId: string) =>
    trpc.mutation('friendship.create', { receiverId })
  );

  return [mutate, isLoading] as const;
}

export function useAcceptRequest() {
  const handler = useErrorHandler();

  const { mutate, isLoading } = useMutation(
    (friendId: string) => trpc.mutation('friendship.accept', { friendId }),
    {
      onError(error) {
        handler(error, 'La solicitud no está disponible');
      },
    }
  );

  return [mutate, isLoading] as const;
}

export function useCancelRequest() {
  const { mutate, isLoading } = useMutation((friendId: string) =>
    trpc.mutation('friendship.delete', { friendId })
  );

  return [mutate, isLoading] as const;
}
