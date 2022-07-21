import passport from 'passport';
import { Router } from 'express';

export const auth = Router();

auth.get('/google', passport.authenticate('google', { scope: ['profile'] }));

auth.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (_, res) => {
    return res.redirect(process.env.WEB_URL as string);
  }
);

auth.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    return res.redirect(process.env.WEB_URL as string);
  });
});
