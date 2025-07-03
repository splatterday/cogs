import { Suspense } from "react";
import SearchResultsServer from "@/features/search/SearchResultsServer";

type SearchPageProps = {
  searchParams: {
    q?: string;
    type?: "artist" | "release" | "master";
    page?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", type, page = "1" } = await searchParams;
  return (
    <Suspense fallback={<p>Loading results…</p>}>
      <SearchResultsServer 
        query={q} 
        type={type} 
        page={Number(page)} 
      />
    </Suspense>
  );
}