import { cache } from "react";
import { searchDiscogs } from "@/api/discogsAPI";
import { DiscogsSearchResponse } from "@/types/discogs";
import Image from "next/image";
import CardGrid from "@/components/ui/CardGrid/CardGrid";

const getCachedSearchResults = cache(async (query: string) => {
    if (!query.trim()) return [];

    return await searchDiscogs(query);
});

export default async function SearchResultsServer({ query }: { query: string }) {
    if (!query) return <p>Enter a search term to begin.</p>;

    const results: DiscogsSearchResponse[] = await getCachedSearchResults(query);
return (
    <div>
        <CardGrid>
            {results.length > 0 ? (
                results.map((item, index) => (
                    <div key={index}>
                        {item.cover_image && (
                            <Image src={item.cover_image} alt={item.title?? "Image"} width={100} height={100} />
                        )}
                    <strong>{item.title}</strong>
                    </div>
                ))
                ) : <p>No results found</p>
            }
        </CardGrid>
    </div>
  );
}

