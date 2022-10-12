import { format, formatDistanceToNowStrict, sub } from 'date-fns';
import { es } from 'date-fns/locale';

export function fromNow(isoDate: string | Date) {
  return formatDistanceToNowStrict(sub(new Date(isoDate), { seconds: 1 }), {
    addSuffix: true,
    locale: es,
  });
}

export function parseDate(isoDate: string | Date) {
  return format(new Date(isoDate), 'dd/MM/yy', { locale: es });
}
