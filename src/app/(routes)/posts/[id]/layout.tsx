import { Theme } from "@radix-ui/themes";
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import DesktopNav from "@/components/DesktopNav";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen dark:bg-gray-800 dark:text-gray-300">
      <DesktopNav />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}