import 'nprogress/nprogress.css';
import React from 'react';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';

NProgress.configure({ showSpinner: false });

export function useRouteChanging() {
  const router = useRouter();

  React.useEffect(() => {
    const start = () => NProgress.start();
    const done = () => NProgress.done();

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
    };
  }, [router]);
}
