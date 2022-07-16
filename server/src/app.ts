import 'dotenv/config';
import * as trpcExpress from '@trpc/server/adapters/express';
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import http from 'http';
import passport from 'passport';
import morgan from 'morgan';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import { router } from './router';
import { auth } from './auth';
import { PrismaClient } from '@prisma/client';
import { configPassport } from './config';
import { createContext } from './lib/createContext';
import { Server } from 'socket.io';

const RedisStore = connectRedis(session);
const redisClient = new Redis();

export async function main() {
  const prisma = new PrismaClient();
  configPassport(prisma);

  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: [process.env.WEB_URL as string],
      methods: ['GET', 'POST'],
    },
  });

  app.use(morgan('dev'));
  app.use(express.json());

  app.use(
    cors({
      origin: [process.env.WEB_URL as string],
      credentials: true,
    })
  );

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'chatcito secret',
      name: 'chatcito-sid',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', auth);

  app.use(
    '/api',
    trpcExpress.createExpressMiddleware({
      router,
      createContext: createContext(prisma),
    })
  );

  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: 'ups!' });
  };

  app.use(errorHandler);

  // Events

  io.on('connection', (socket) => {
    socket.on('room:join', (rid, callback) => {
      socket.join(rid);
      callback();
    });

    socket.on('room:chat', async (data, callback) => {
      const { chat: content, rid, sender } = data;

      const chat = await prisma.chat.create({
        data: {
          content,
          roomId: rid,
          senderId: sender.id,
        },
        include: {
          sender: true,
        },
      });

      socket.to(rid).emit('room:chat', chat);
      callback(chat);
    });
  });

  server.listen(4000, () => {
    console.log(`Server ready at http://localhost:${4000}/ 🚀`);
  });
}
