import React from 'react';
import { useRouter } from 'next/router';
import { useSocket } from '../../context/SocketProvider';
import { useAuthUser } from '../../hooks/useMe';
import { InferQueryOutput } from '../../types';
import { useQueryClient } from 'react-query';

type Chat = InferQueryOutput<'room.chats'>[number];

export function useChat() {
  const router = useRouter();
  const socket = useSocket();
  const queryClient = useQueryClient();

  const [sender] = useAuthUser();

  const send = React.useCallback(
    (chat: string) => {
      const rid = router.query.rid;
      if (typeof rid !== 'string' || !sender) return;

      socket.emit('room:chat', { chat, rid, sender }, (chat: Chat) => {
        console.log(chat.createdAt);
        queryClient.setQueryData<Chat[]>(['rooms', rid, 'chats'], (prev) => {
          if (!prev) return [chat];
          return [...prev, chat];
        });
      });
    },
    [sender, router, socket, queryClient]
  );

  return { send };
}
