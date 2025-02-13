import Image from "next/image";
import { DiscogsCollectionResponse } from "@/types/discogs";
import { searchDiscogs } from "@/api/discogsAPI";
import { cache } from "react";

const getCachedSearchResults = cache(async (query: string) => {
    return await searchDiscogs(query);
});

export default async function SearchResults({ query }: { query: string }) {
    if (!query.trim()) return <p>Enter a search term to begin.</p>;

    const results: DiscogsCollectionResponse = await getCachedSearchResults(query);

    return (
        <div>
            <ul>
                {results.items?.length > 0 ? (
                    results.items.map((item, index) => (
                        <li key={index}>
                            <strong>{item.basic_information.title}</strong> ({item.basic_information.year})
                            {item.basic_information.cover_image && (
                                <Image
                                    src={item.basic_information.cover_image}
                                    alt={item.basic_information.title}
                                    width={100}
                                    height={100}
                                />
                            )}
                        </li>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </ul>
        </div>
    );
}
