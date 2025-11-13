import { Geist, Geist_Mono, Inter, Lusitana, Quicksand } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
    weight: "700",
    subsets: ["latin"]
});

export const geistSans = Geist({
    variable: '--font-geist-sans', //${geistSans.variable}
    subsets: ['latin'],
});

export const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const quicksand = Quicksand({
    subsets: ["latin"]
});