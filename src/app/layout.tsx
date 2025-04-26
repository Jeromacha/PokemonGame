import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';
import './globals.css';
import Menu from './components/menu';
import { SoundProvider } from './Context/Sonido';


const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixel'
});

export const metadata: Metadata = {
  title: 'Who\'s That Pokémon?',
  description: '¡Adivina el Pokémon por su silueta!',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${pixelFont.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      
      <body className="min-h-screen bg-background text-foreground">
        <SoundProvider>
          <div className="container mx-auto px-4 py-6 flex flex-col min-h-screen">
            <Menu />
            
            <main className="flex-1 py-8">
              {children}
            </main>
            
            <footer className="py-6 text-center text-sm  bg-black/60 backdrop-blur shadow-md">
              <p>© {new Date().getFullYear()} - Pokémon es una marca registrada de Nintendo</p>
              <p className="mt-1">Creado con Next.js y PokeAPI</p>
            </footer>
          </div>
        </SoundProvider>
      </body>
    </html>
  );
}