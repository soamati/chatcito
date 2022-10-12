import React from 'react';
import { useSocket } from '@/context/SocketProvider';

export function useJoinRoom() {
  const [isJoined, setIsJoined] = React.useState(false);
  const socket = useSocket();

  const join = React.useCallback(
    (rid: string) => {
      socket.emit('room:join', rid, () => {
        setIsJoined(true);
      });
    },
    [socket]
  );

  return { join, isJoined };
}
