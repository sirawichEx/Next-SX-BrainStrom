import { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  typedRoutes: true,
  // redirects: async () => {
  //   return [
  //     {
  //       source: '/temp',
  //       destination: '/new-temp',
  //       permanent: true,
  //       statusCode: 308,
  //       locale: false,
  //       has: ['/temp'],
  //       missing: ['/new-temp'],
  //     },
  //   ];
  // },
};

const withNextIntl = createNextIntlPlugin('./src/libs/i18n/request.ts');
export default withNextIntl(nextConfig);
