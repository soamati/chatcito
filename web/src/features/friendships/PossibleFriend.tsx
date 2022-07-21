import React from 'react';
import { Paper, Group, Button, Text } from '@mantine/core';
import { InferQueryOutput } from '../../types';
import { useAcceptRequest, useCancelRequest, useSendRequest } from './queries';
import { useWatchedState } from '../../hooks/useWatchedState';
import { UserPreview } from '../../components/UserPreview';

type Props = {
  user: InferQueryOutput<'user.all'>[number];
};

export const PossibleFriend = ({ user }: Props) => {
  const [friendship, setFriendship] = useWatchedState(user.friendship);

  const [send, isSending] = useSendRequest();
  const [accept, isAccepting] = useAcceptRequest();
  const [cancel, isCanceling] = useCancelRequest();

  const handleSend = () => {
    send(user.id, {
      onSuccess() {
        setFriendship({ isSender: true, status: 'PENDING' });
      },
      onError() {
        setFriendship(null);
      },
    });
  };

  const handleAccept = () => {
    accept(user.id, {
      onSuccess() {
        setFriendship({ isSender: false, status: 'ACCEPTED' });
      },
      onError() {
        setFriendship(null);
      },
    });
  };

  const handleCancel = () => {
    cancel(user.id, {
      onSuccess() {
        setFriendship(null);
      },
      onError() {
        setFriendship(null);
      },
    });
  };

  return (
    <Paper withBorder key={user.id}>
      <Group p="xs" position="apart">
        <UserPreview user={user} />
        {!friendship ? (
          <Button variant="subtle" onClick={handleSend} loading={isSending}>
            Agregar
          </Button>
        ) : (
          <>
            {friendship.status === 'ACCEPTED' ? (
              <Text mr="lg" size="sm" weight="bold" color="gray">
                Amigos
              </Text>
            ) : (
              <>
                {friendship.isSender ? (
                  <Button
                    variant="subtle"
                    color="red"
                    onClick={handleCancel}
                    loading={isCanceling}
                  >
                    Cancelar
                  </Button>
                ) : (
                  <Group spacing="xs">
                    <Button
                      variant="subtle"
                      onClick={handleAccept}
                      loading={isAccepting}
                    >
                      Aceptar
                    </Button>
                    <Button
                      variant="outline"
                      color="red"
                      onClick={handleCancel}
                      loading={isCanceling}
                    >
                      Rechazar
                    </Button>
                  </Group>
                )}
              </>
            )}
          </>
        )}
      </Group>
    </Paper>
  );
};
