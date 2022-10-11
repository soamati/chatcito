import React from 'react';
import { useSocket } from '../../context/SocketProvider';
import { useAuthUser } from '../../hooks/useAuthUser';
import { InferQueryOutput } from '../../types';
import { useQueryClient } from 'react-query';
import { useRoomId } from './useRoomId';

type Chat = InferQueryOutput<'room.chats'>[number];

export function useChat() {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const rid = useRoomId();

  const [sender] = useAuthUser();

  const addChat = React.useCallback(
    (chat: Chat) => {
      queryClient.setQueryData<Chat[]>(['rooms', rid, 'chats'], (prev) => {
        if (!prev) return [chat];
        return [...prev, chat];
      });
    },
    [rid, queryClient]
  );

  React.useEffect(() => {
    socket.on('room:chat', addChat);

    return () => {
      socket.off('room:chat');
    };
  }, [socket, addChat]);

  const send = React.useCallback(
    (chat: string) => {
      socket.emit('room:chat', { chat, rid, sender }, addChat);
    },
    [sender, socket, rid, addChat]
  );

  return { send };
}
