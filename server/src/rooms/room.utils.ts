import { Room, User, UsersOnRooms } from '@prisma/client';

export function roomPermissions(
  room: Room & { owner: User; members: UsersOnRooms[] },
  user: User,
) {
  const permissions = {
    isOwner: user.id === room.owner.id,
    isMember: false,
  };

  if (permissions.isOwner) {
    permissions.isMember = true;
    return permissions;
  }

  for (const { userId } of room.members) {
    if (userId === user.id) {
      permissions.isMember = true;
      break;
    }
  }

  return permissions;
}
