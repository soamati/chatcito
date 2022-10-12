import { CookieOptions, Request } from 'express';

export function cookieOptions(req: Request): CookieOptions {
  const options: CookieOptions = { httpOnly: true };

  const { origin } = req.headers;

  if (origin && !origin.startsWith('https')) {
    return options;
  }

  if (process.env.NODE_ENV === 'prod') {
    options.domain = 'chatcito.fun';
  }

  options.secure = true;
  options.sameSite = 'none';

  return options;
}
