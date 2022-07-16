import { formatDistanceToNowStrict, sub } from 'date-fns';
import { es } from 'date-fns/locale';

export function fromNow(isoDate: string | Date) {
  return formatDistanceToNowStrict(sub(new Date(isoDate), { seconds: 2 }), {
    addSuffix: true,
    locale: es,
  });
}
