import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import Shell from '@/components/Shell';
export const metadata: Metadata = {
 metadataBase: new URL('https://gita.arpitagarwala.com'),
 title: { default: 'Gita for Life — Ancient wisdom. Everyday clarity.', template: '%s | Gita for Life' },
 description: 'Explore the complete Bhagavad Gita in Sanskrit, Hindi and English. Find connected shlokas for everyday challenges, build a reading habit, and reflect privately. Free, with no account required.',
 manifest: '/manifest.webmanifest',
 openGraph: {title:'Gita for Life',description:'Ancient wisdom. Everyday clarity.',type:'website',locale:'en_IN'},
 robots: {index:true,follow:true}, icons: {icon:'/icon.svg'},
};
export const viewport: Viewport = {width:'device-width',initialScale:1,themeColor:'#244e40'};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en" suppressHydrationWarning><body><Shell>{children}</Shell></body></html>;
}