import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Suman Bhadra | Full Stack Developer & Cloud Engineer',
  description: 'Full Stack Developer and Cloud Engineer specializing in MERN stack, Microsoft Azure, GCP, real-time AI integration, and microservices.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light scroll-smooth bg-[#faf9f7]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#faf9f7] text-[#1a1a1a] antialiased selection:bg-[#e85a3b]/20 selection:text-[#e85a3b] min-h-screen">
        {children}
      </body>
    </html>
  );
}
