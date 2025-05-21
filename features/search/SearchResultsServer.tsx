import CardGrid       from "@/components/ui/CardGrid/CardGrid";
import Pagination     from "@/components/ui/Pagination/Pagination";
import { searchDiscogs, SearchResponse } from "@/lib/discogsAPI";

export default async function SearchResultsServer({
  query,
  type = "release",
  page = 1,
}: {
  query?: string;
  type?: "artist" | "release" | "master";
  page?: number;
}) {
  if (!query?.trim()) {
    return <p>Enter a search term to begin.</p>;
  }

  const { results, totalPages }: SearchResponse =
    await searchDiscogs(query, type, page);

  return (
    <>
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}

        <CardGrid items={results} />

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
