import React from 'react';
import { useSocket } from '../../context/SocketProvider';

export function useJoinRoom() {
  const [isJoined, setInJoined] = React.useState(false);
  const socket = useSocket();

  const join = React.useCallback(
    (rid: string) => {
      socket.emit('room:join', rid, () => {
        setInJoined(true);
      });
    },
    [socket]
  );

  return { join, isJoined };
}
