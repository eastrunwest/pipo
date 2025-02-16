import Preloader from "@/components/Preloader";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-3xl p-6 bg-black bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl animate-fadeIn">
        <SearchForm />
        {typeof query !== "undefined" && (
          <Suspense fallback={<Preloader />}>
            <SearchResults query={query} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
