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



export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="manu-font">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Provider>{children}</Provider>
      </body>
    </html>
  );
}
