import { createRouter } from './lib/createRouter';
import { friendships } from './friendship/router';
import { rooms } from './room/router';
import { users } from './user/router';
import { invitations } from './invitation/router';

export const router = createRouter()
  .merge('user.', users)
  .merge('room.', rooms)
  .merge('friendship.', friendships)
  .merge('invitation.', invitations);

export type AppRouter = typeof router;
