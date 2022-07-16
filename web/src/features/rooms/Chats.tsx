import React from 'react';
import { Avatar, Group, Paper, Text, Stack, createStyles } from '@mantine/core';
import { useChats } from './queries';
import { fromNow } from '../../utils/date';
import { useScrollIntoView } from '@mantine/hooks';
import { Loader } from '../../components/Loader';

const useStyles = createStyles(() => ({
  chatContainer: {
    borderRadius: '1em 1em 1em 0',
    wordBreak: 'break-all',
  },
}));

export const Chats = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 0,
  });
  const { classes } = useStyles();
  const [chats] = useChats();

  React.useLayoutEffect(() => {
    scrollIntoView();
  }, [chats?.length, scrollIntoView]);

  if (!chats) {
    return <Loader />;
  }

  return (
    <Stack pt="xs" px="sm">
      {chats.map((chat) => (
        <Paper key={chat.id}>
          <Group align="end" spacing="xs" sx={{ flexWrap: 'nowrap' }}>
            <Avatar
              src={chat.sender.image}
              alt={chat.sender.name}
              radius="xl"
              size="sm"
            >
              {getInitials(chat.sender.name)}
            </Avatar>
            <Stack spacing={2}>
              <Group ml="xs" spacing="xs">
                <Text size="xs">{chat.sender.name}</Text>
                &middot;
                <Text size="xs">{fromNow(chat.createdAt)}</Text>
              </Group>
              <Paper withBorder p="sm" className={classes.chatContainer}>
                <Text>{chat.content}</Text>
              </Paper>
            </Stack>
          </Group>
        </Paper>
      ))}
      <div ref={targetRef} />
    </Stack>
  );
};

function getInitials(fullname: string) {
  const [firstname, lastname] = fullname.split(' ');
  if (!lastname) {
    return firstname.slice(0, 2);
  }
  return `${firstname[0]}${lastname[0]}`;
}
