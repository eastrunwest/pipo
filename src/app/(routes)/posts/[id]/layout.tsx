// PostLayout.tsx
import MobileNav from "@/components/MobileNav";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] animate-gradientBg dark:bg-gray-800 dark:text-gray-300">
      <MobileNav />
      <main className="flex-1 overflow-auto">
        <div className="max-w-full mx-auto px-4 py-4">
          {children}
        </div>
      </main>
    </div>
  );
}
