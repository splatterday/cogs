// features/search/SearchResultsServer.tsx
import CardGrid       from "@/components/ui/CardGrid/CardGrid";
import Pagination     from "@/components/ui/Pagination/Pagination";
import { searchDiscogs, SearchResponse } from "@/api/discogsAPI";
import type { BaseDiscogsItem } from "@/types/discogs";
import Image from "next/image";

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

  // ✨ New call returns both results + pagination
  const { results, totalPages }: SearchResponse =
    await searchDiscogs(query, type, page);

  return (
    <>
      {/* render pagination if more than one page */}
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}

      {/* render the grid or no‐data message */}
      {results.length > 0 ? (
        <CardGrid>
            {results.length > 0 ? (
                results.map((item: BaseDiscogsItem, index: number) => (
                    <div key={index}>
                        {item.cover_image && (
                            <Image src={item.cover_image} alt={item.title ?? "Image"} width={100} height={100} />
                        )}
                        <strong>{item.title}</strong>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </CardGrid>
      ) : (
        <p>No results found</p>
      )}

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
