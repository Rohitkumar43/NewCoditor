'use client';

import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import UpgradeProButton from './UpgradeProButton';
import { useAuth } from '@clerk/nextjs';

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e2e]/80 backdrop-blur-lg border-b border-[#313244]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Coditor
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/snippets" className="text-gray-300 hover:text-white transition-colors">
              Snippets
            </Link>
            <Link href="/playground" className="text-gray-300 hover:text-white transition-colors">
              Playground
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {isSignedIn && <UpgradeProButton />}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
} 