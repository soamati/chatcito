import React from 'react';
import { Paper, Group, Textarea, Button } from '@mantine/core';
import { useChat } from './useChat';

export const ChatInput = () => {
  const [chat, setChat] = React.useState('');
  const { send } = useChat();

  const onSend = React.useCallback(() => {
    const trimed = chat.trim();
    if (!trimed) return;

    // Send message here
    send(trimed);

    setChat('');
  }, [chat, send]);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const eValue = e.target.value;
      if (eValue.length === 1 && eValue.charCodeAt(0) === 10) {
        return;
      }
      setChat(e.target.value);
    },
    []
  );

  const handleEnter = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        onSend();
      }
    },
    [onSend]
  );

  return (
    <Paper withBorder p="xs" sx={{ position: 'fixed', inset: 'auto 0 0 0' }}>
      <Group>
        <Textarea
          sx={{ flex: 1 }}
          minRows={1}
          variant="unstyled"
          autosize
          maxRows={3}
          value={chat}
          onChange={onChange}
          onKeyDown={handleEnter}
        />
        <Button variant="subtle" uppercase size="xs">
          Enviar
        </Button>
      </Group>
    </Paper>
  );
};
