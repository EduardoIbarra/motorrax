import es from '../dictionaries/es.json';
import en from '../dictionaries/en.json';

export type Locale = 'es' | 'en';

const dictionaries = {
  es,
  en,
};

export function getDictionary(locale: Locale = 'es') {
  return dictionaries[locale] || dictionaries.es;
}

export function formatMessage(key: string, locale: Locale = 'es'): string {
  const dict = getDictionary(locale);
  const keys = key.split('.');
  
  let current: any = dict;
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return key;
    }
  }
  return typeof current === 'string' ? current : key;
}
