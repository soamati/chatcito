import { useMutation, useQuery } from 'react-query';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { trpc } from '../../lib/trpc';

export function useFriends() {
  const { data, isLoading } = useQuery(['friends'], () =>
    trpc.query('friendship.friends')
  );

  return [data, isLoading] as const;
}

export function useFriendRequests() {
  const { data, isLoading } = useQuery(['friend-requests'], async () => {
    const requests = await trpc.query('friendship.requests');

    return requests.map((request) => ({
      ...request.sender,
      friendship: {
        isSender: false,
        status: request.status,
      },
    }));
  });

  return [data, isLoading] as const;
}

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
