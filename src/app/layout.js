import { Geist, Geist_Mono, Roboto } from 'next/font/google';
import { Provider } from './provider';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Todo App',
  description:
    'List your stuff!',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  },
  manifest: "/manifest.json",
  themeColor: "#317EFB",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="My App" />
          <link rel="apple-touch-icon" href="/logo.png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
        >
          <ThemeProvider attribute="data-mode"><Provider>{children}</Provider></ThemeProvider>
      </body>
    </html>
  );
}
