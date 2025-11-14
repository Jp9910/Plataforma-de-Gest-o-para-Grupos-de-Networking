import type { Metadata } from 'next';
import { quicksand } from '@/app/components/ui/fonts';
import './globals.css';
import { MembroProvider } from './context/membroContext';

export const metadata: Metadata = {
    title: 'Grupo de Networking',
    description: 'Plataforma para gerenciamento de grupos de networking',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${quicksand.className} antialiased`}
            >
                <div className="
                    container 
                    bg-gray-200 
                    text-gray-900 
                    dark:bg-gray-800 
                    dark:text-white 
                    border-solid 
                    border-blue-300
                    w-auto
                    min-w-5/20
                    max-w-19/20
                    mt-5
                    mx-auto
                    p-6
                    box-border
                    shadow-2xl
                    rounded-2xl
                    min-h-screen
                    h-auto
                ">
                    <MembroProvider>
                        {children}
                    </MembroProvider>
                </div>
            </body>
        </html>
    );
}
