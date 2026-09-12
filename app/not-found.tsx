import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1a1a] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-serif-title text-7xl font-bold text-[#e85a3b] mb-4">404</h1>
      <h2 className="text-xl font-bold font-mono-tag mb-2">Page Not Found</h2>
      <p className="text-sm text-[#6b7280] mb-6 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-[#1a1a1a] text-white rounded-xl text-xs font-mono-tag font-bold hover:bg-[#e85a3b] transition-colors"
      >
        RETURN HOME
      </Link>
    </div>
  );
}
