type ID = string;
type DateTime = string;

export interface User {
  id: ID;
  name: string;
  image: string;
}

export interface Room {
  id: ID;
  name: string;
  owner: User;
  chats: Chat[];
  isOwner?: boolean;
  members: UserRoomRelation[];
}

export interface Chat {
  id: ID;
  content: string;
  createdAt: DateTime;
  sender: User;
  room: Room;
}

export interface UserRoomRelation {
  room: Room;
  user: User;
  memberSince: DateTime;
}

export interface Invitation {
  id: ID;
  sender: User;
  target: User;
  room: Room;
  createdAt: DateTime;
}

export type FriendshipStatus = 'PENDING' | 'ACCEPTED' | 'BANNED';

export interface Friendship {
  sender: User;
  receiver: User;
  status: FriendshipStatus;
  createdAt: DateTime;
}
