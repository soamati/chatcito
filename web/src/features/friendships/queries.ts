import api from '@/api';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Friendship, FriendshipStatus, User } from '@/types';
import { useMutation, useQuery } from 'react-query';

export type PossibleFriend = User & {
  friendship: {
    isSender: boolean;
    status: FriendshipStatus;
  } | null;
};

export function usePossibleFriends() {
  const { data } = useQuery(['users'], () =>
    api.get<PossibleFriend[]>('/users/possible-friends')
  );

  return [data];
}

export function useFriends() {
  const { data, isLoading } = useQuery(['friends'], () =>
    api.get<User[]>('/friendships/friends')
  );

  return [data, isLoading] as const;
}

export function useFriendRequests() {
  const { data, isLoading } = useQuery(['friend-requests'], async () => {
    const requests = await api.get<Friendship[]>('/friendships/requests');

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
    api.post<Friendship>(`/friendships/requests/send/${receiverId}`)
  );

  return [mutate, isLoading] as const;
}

export function useAcceptRequest() {
  const handler = useErrorHandler();

  const { mutate, isLoading } = useMutation(
    (friendId: string) =>
      api.post<Friendship>(`/friendships/requests/accept/${friendId}`),
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
    api.delete(`/friendships/${friendId}`)
  );

  return [mutate, isLoading] as const;
}
