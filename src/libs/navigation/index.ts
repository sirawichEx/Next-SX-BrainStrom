import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const locales = [
  {
    title: 'en',
    key: 'en',
  },
  {
    title: 'Thai',
    key: 'th',
  },
];

export const routing = defineRouting({
  locales: locales.map((locale) => locale.key),
  defaultLocale: locales[0].key,
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
