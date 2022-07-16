import { createRouter } from './lib/createRouter';
import { rooms } from './room/router';
import { users } from './user/router';

export const router = createRouter()
  .merge('user.', users)
  .merge('room.', rooms);

export type AppRouter = typeof router;
