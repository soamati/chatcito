import { showNotification } from '@mantine/notifications';
import React from 'react';

export function useErrorHandler() {
  const handler = React.useCallback((error: any, customMessage?: string) => {
    const message = customMessage ?? error.message ?? 'Algo salió mal';

    showNotification({
      title: 'Ups! 😳',
      message,
      color: 'red',
    });
  }, []);

  return handler;
}
