import React from 'react';
import { Stack } from '@mantine/core';
import { useChats } from './queries';
import { ChatItem } from './ChatItem';
import { useAuthUser } from '../../hooks/useAuthUser';

type Props = {
  scrollToBottom: () => void;
};

export const Chats = ({ scrollToBottom }: Props) => {
  const [chats] = useChats();
  const [user] = useAuthUser();

  React.useLayoutEffect(() => {
    scrollToBottom();
  }, [chats?.length, scrollToBottom]);

  if (!chats || !user) {
    return null;
  }

  return (
    <Stack pt="xs" px="md">
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} isMe={chat.sender.id === user.id} />
      ))}
    </Stack>
  );
};
