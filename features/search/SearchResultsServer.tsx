import { cache } from "react";
import { searchDiscogs } from "@/api/discogsAPI";
import { DiscogsSearchResponse } from "@/types/discogs";
import Image from "next/image";

const getCachedSearchResults = cache(async (query: string) => {
  if (!query.trim()) return [];

  console.log(`Fetching results for query: ${query}`); // Debugging

  return await searchDiscogs(query);
});

export default async function SearchResultsServer({ query }: { query: string }) {
  if (!query) return <p>Enter a search term to begin.</p>;

  const results: DiscogsSearchResponse[] = await getCachedSearchResults(query);
    console.log('RESULTS', results);
  return (
    <div>
      <ul>
        {results.length > 0 ? (
          results.map((item, index) => (
            <li key={index}>
                {item.cover_image && (
                    <Image src={item.cover_image} alt={item.title} width={100} height={100} />
                )}
              <strong>{item.title}</strong>
            </li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
}

