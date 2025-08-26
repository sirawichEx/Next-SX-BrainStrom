import { getRequestConfig } from 'next-intl/server';

import { locales } from '../navigation';

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.some((l) => l.key === locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../../../messages/${locale}.json`)).default,
    onError: (error) => {
      console.error(error);
    },
  };
});
