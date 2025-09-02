import { Geist, Geist_Mono } from 'next/font/google';
import { Provider } from './provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata = {
  title: 'Todo App',
  description:
    'List your stuff!',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  }
};

export function generateThemeScript() {
  return `
    (function() {
      try {
        const html = document.documentElement;
        const theme = localStorage.getItem('hs_theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = theme === 'dark' || (theme === 'auto' && prefersDark);
        const isLight = theme === 'light' || (theme === 'auto' && !prefersDark);

        if (isDark) html.classList.add('dark');
        if (isLight) html.classList.remove('dark');
      } catch (_) {}
    })();
  `;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="manu-font">
      <head>
        <script dangerouslySetInnerHTML={{ __html: generateThemeScript()}}/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Provider>{children}</Provider>
      </body>
    </html>
  );
}
