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
    return activeTab === path ? 'text-ig-red dark:text-ig-orange' : 'text-gray-700 dark:text-gray-300';
  };

  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0">
      <div className="flex *:flex *:items-center">
        <div className="pl-2 bg-white dark:bg-gray-700 rounded-t-xl w-full relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
          <Link href="/" className={getTabClass('/')}>
            <HomeIcon onClick={() => handleTabClick('/')} />
          </Link>
        </div>
        <div className="size-14 relative -top-4 justify-center w-[140px]">
          <div className="absolute bg-blue-500 bg-clip-text border-white dark:border-gray-700 border-t-transparent dark:border-t-transparent border-l-transparent dark:border-l-transparent border-[50px] rounded-full rotate-45">
            <div className="border-4 size-15 border-transparent">
              <Link href="/create" className="-rotate-45 bg-gradient-to-tr from-ig-orange to-ig-red to-70% size-12 flex items-center justify-center text-white rounded-full">
                <ScaleIcon onClick={() => handleTabClick('/create')} />
              </Link>
            </div>
          </div>
        </div>
        <div className="pr-2 w-full bg-white dark:bg-gray-700 rounded-t-xl relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
          <Link href="/profile" className={getTabClass('/profile')}>
            <UserIcon onClick={() => handleTabClick('/profile')} />
          </Link>
        </div>
      </div>
    </div>
  );
}