import '@/styles/globals.css';
import { Geist, Geist_Mono } from 'next/font/google'; // Fonts hier importiert, damit sie global gelten (vorher nur in Home).
import type { AppProps } from 'next/app';
import Header from '@/components/layout/Header';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        // Header und Footer liegen hier, da sie auf allen Seiten sichtbar sein sollen.
        <div className={`${geistSans.className} ${geistMono.className}`}>
            <Header />
            <main className="mx-auto max-w-6xl px-4 py-8">
                <Component {...pageProps} />
            </main>
            <footer></footer>
        </div>
    );
}
