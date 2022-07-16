import { useRouter } from 'next/router';
import React from 'react';
import { useSocket } from '../../context/SocketProvider';

export function useJoinRoom() {
  const [isJoined, setInJoined] = React.useState(false);
  const socket = useSocket();
  const router = useRouter();

  React.useEffect(() => {
    const rid = router.query.rid;
    if (typeof rid !== 'string') return;

    socket.emit('room:join', rid, () => {
      setInJoined(true);
    });
  }, [socket, router]);

  return { isJoined };
}
