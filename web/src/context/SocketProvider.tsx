import React, { PropsWithChildren } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = React.createContext<Socket | null>(null);

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const socketRef = React.useRef(io(url, { autoConnect: false }));

  React.useEffect(() => {
    const socket = socketRef.current;
    if (!socket || socket.connected) return;

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = React.useContext(SocketContext);

  if (!socket) {
    throw new Error('Use inside a provider!');
  }

  return socket;
};
