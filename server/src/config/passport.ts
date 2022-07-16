import passport from 'passport';
import { PrismaClient, User } from '@prisma/client';
import { Strategy } from 'passport-google-oauth20';

export function configPassport(prisma: PrismaClient) {
  const strategy = new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:4000/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findFirst({ where: { id: profile.id } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              id: profile.id,
              name: profile.displayName,
            },
          });
        }
        if (!user.image && profile.photos && profile.photos.length > 0) {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              image: profile.photos[0].value,
            },
          });
        }
        return done(null, user);
      } catch (error: any) {
        return done(error);
      }
    }
  );

  passport.use(strategy);

  passport.serializeUser<string>((user, done) => {
    const { id } = user as User;
    done(null, id);
  });

  passport.deserializeUser<string>(async (id, done) => {
    try {
      const user = await prisma.user.findFirst({ where: { id } });
      done(null, user);
    } catch (error: any) {
      done(error);
    }
  });
}
