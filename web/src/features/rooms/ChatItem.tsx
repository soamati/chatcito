import React from 'react';
import { Paper, Group, Avatar, Stack, Text, createStyles } from '@mantine/core';
import { fromNow } from '../../utils/date';
import { InferQueryOutput } from '../../types';
import { getInitials } from '../../utils/getInitials';

type Props = {
  chat: InferQueryOutput<'room.chats'>[number];
  isMe?: boolean;
};

const useStyles = createStyles((_theme, { isMe }: Pick<Props, 'isMe'>) => ({
  container: {
    flexWrap: 'nowrap',
    flexDirection: isMe ? 'row-reverse' : 'row',
  },
  content: {
    borderRadius: isMe ? '1em 1em 0 1em' : '1em 1em 1em 0',
    wordBreak: 'break-all',
  },
}));

export const ChatItem = ({ chat, isMe = false }: Props) => {
  const { classes } = useStyles({ isMe });

  return (
    <Paper key={chat.id}>
      <Group align="end" spacing="xs" className={classes.container}>
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
          <Paper withBorder p="sm" className={classes.content}>
            <Text>{chat.content}</Text>
          </Paper>
        </Stack>
      </Group>
    </Paper>
  );
};
