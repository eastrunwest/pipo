"use client";

import { useState } from 'react';
import { CameraIcon, HomeIcon, ScaleIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname || '/');

  if (!pathname || pathname.startsWith('/posts/')) {
    return null;
  }

  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };

  const getTabClass = (path: string) => {
    return activeTab === path ? 'text-pink-500' : 'text-gray-400';
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[70%] bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 shadow-xl shadow-purple-700/50 rounded-full p-4 flex justify-around items-center backdrop-blur-md border border-white/20">
      <Link href="/" onClick={() => handleTabClick('/')} className="flex flex-col items-center">
        <HomeIcon className={`w-6 h-6 ${getTabClass('/')}`} />
        <span className="text-xs mt-1 text-white">Home</span>
      </Link>

      <Link href="/create" onClick={() => handleTabClick('/create')} className="flex flex-col items-center mx-4">
        <ScaleIcon className={`w-6 h-6 ${getTabClass('/create')}`} />
        <span className="text-xs mt-1 text-white">Create</span>
      </Link>

      <Link href="/profile" onClick={() => handleTabClick('/profile')} className="flex flex-col items-center">
        <UserIcon className={`w-6 h-6 ${getTabClass('/profile')}`} />
        <span className="text-xs mt-1 text-white">Profile</span>
      </Link>
    </div>
  );
}