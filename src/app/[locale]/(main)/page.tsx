import { Container, ApiStatus } from '@/features/shared/components';
import { api } from '@/libs/api';
import { Link } from '@/libs/navigation';
import { getMetadata } from '@/libs/utils';
import { getTranslations } from 'next-intl/server';

export function generateMetadata() {
  return getMetadata({
    title: 'Home',
    description: 'Home page',
    openGraph: {
      title: 'Home',
      description: 'Home page',
      images: ['/images/og-image.png'],
    },
  })
}
export default async function Home() {
  const res = await api.get('/api/hello', {
    cache: 'force-cache',
    revalidate: 10,
  });
  const t = await getTranslations('common')
  console.log('ggg',res)
  return (
    <Container>
      <div className="py-20">
        <h1 className="text-4xl font-bold text-center mb-8">
          {t('hello')}
          {t('nextjs')}
        </h1>
        <p className="text-center text-gray-600 max-w-lg mx-auto">
          This starter template uses a feature-based architecture to help organize 
          your Next.js application by domain features rather than technical layers.
        </p>
        <Link locale='th' href={'/cart'}></Link>
        <ApiStatus />
      </div>
    </Container>
  );
}
