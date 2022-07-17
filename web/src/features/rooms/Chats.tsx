import React from 'react';
import { Stack } from '@mantine/core';
import { useChats } from './queries';
import { useScrollIntoView } from '@mantine/hooks';
import { Loader } from '../../components/Loader';
import { ChatItem } from './ChatItem';
import { useAuthUser } from '../../hooks/useMe';

export const Chats = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 0,
  });
  const [chats] = useChats();
  const [user] = useAuthUser();

  React.useLayoutEffect(() => {
    scrollIntoView();
  }, [chats?.length, scrollIntoView]);

  if (!chats || !user) {
    return <Loader />;
  }

  return (
    <Stack pt="xs" px="sm">
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} isMe={chat.sender.id === user.id} />
      ))}
      <div ref={targetRef} />
    </Stack>
  );
};
