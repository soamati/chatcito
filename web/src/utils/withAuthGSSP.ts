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

      const {
        result: { data },
      } = await res.json();

      if (!data && resolvedUrl !== '/') {
        return {
          redirect: {
            destination: '/',
            permanent: true,
          },
        };
      }

      if (data && resolvedUrl === '/') {
        return {
          redirect: {
            destination: '/home',
            permanent: true,
          },
        };
      }

      return {
        props: {
          user: data,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        props: {},
      };
    }
  };
};
