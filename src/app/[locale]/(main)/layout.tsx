import '../../globals.css'
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages()
  const locale = await getLocale()
  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
