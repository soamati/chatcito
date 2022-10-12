import { GetServerSideProps } from 'next';
import { User } from '@/types';

export type WithUserProps<T> = T & {
  user: User;
};

export const withAuthGSSP = (): GetServerSideProps => {
  return async ({ req, resolvedUrl }) => {
    try {
      const headers = req.headers as HeadersInit;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`,
        {
          headers,
          credentials: 'include',
        }
      );

      if (!res.ok) {
        return {
          redirect: {
            destination: '/',
            permanent: true,
          },
        };
      }

      const user = await res.json();

      if (resolvedUrl === '/') {
        return {
          redirect: {
            destination: '/home',
            permanent: true,
          },
        };
      }

      return {
        props: {
          user,
        },
      };
    } catch (error) {
      return {
        props: {},
      };
    }
  };
};
