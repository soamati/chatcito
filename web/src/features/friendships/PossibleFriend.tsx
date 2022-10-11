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
    <Paper withBorder key={user.id} radius={0}>
      <Group p="xs" position="apart">
        <UserPreview user={user} />
        {!friendship ? (
          <Button compact onClick={handleSend} loading={isSending}>
            Agregar
          </Button>
        ) : (
          <>
            {friendship.status === 'ACCEPTED' ? (
              <Text mr="xs" size="sm">
                Amigos
              </Text>
            ) : (
              <>
                {friendship.isSender ? (
                  <Button
                    color="red"
                    onClick={handleCancel}
                    loading={isCanceling}
                    compact
                  >
                    Cancelar
                  </Button>
                ) : (
                  <Group spacing="xs">
                    <Button
                      variant="subtle"
                      onClick={handleAccept}
                      loading={isAccepting}
                      compact
                    >
                      Aceptar
                    </Button>
                    <Button
                      variant="outline"
                      color="red"
                      onClick={handleCancel}
                      loading={isCanceling}
                      compact
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
