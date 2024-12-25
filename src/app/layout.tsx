import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoginModal from './components/modals/LoginModal';
import SignupModal from './components/modals/SignupModal';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Mentory App',
  description: 'It connects mentees preparing for a career in development with mentors.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
          <LoginModal />
          <SignupModal />
        <main>
          {children}</main>
        <Footer />
      </body>
    </html>
  );
}
