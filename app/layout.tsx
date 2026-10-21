import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { UIProvider } from '@/components/layout/UIProvider';
import { Header } from '@/components/layout/Header';
import { BottomBar } from '@/components/layout/BottomBar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'Лебеди — ветеринарная клиника в Москве, круглосуточно',
  description:
    'Ветеринарные клиники «Лебеди» в Раменках, Олимпийской деревне и Видном. С 2006 года. Круглосуточный приём, лапароскопическая хирургия, реанимация, стационар, зоотакси.',
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Лебеди — ветеринарная клиника, где Вам всё объясняют',
    description: 'Три клиники в Москве и Видном. Круглосуточно. С 2006 года.',
    images: ['/og.jpg'],
    locale: 'ru_RU',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F6F2EA',
};

const skyScript = `(function(){try{var d=document.documentElement;var h=Number(new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',hour:'2-digit',hour12:false}).format(new Date()))%24;var auto=(h>=21||h<9)?'night':'day';var p=null;try{p=localStorage.getItem('sky')}catch(e){}d.dataset.auto=auto;d.dataset.sky=(p==='day'||p==='night')?p:auto}catch(e){document.documentElement.dataset.sky='day'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-sky="day" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: skyScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">К содержимому</a>
        <SmoothScroll />
        <UIProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <BottomBar />
        </UIProvider>
      </body>
    </html>
  );
}
