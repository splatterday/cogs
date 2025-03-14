import { cache } from "react";
import Image from "next/image";
import CardGrid from "@/components/ui/CardGrid/CardGrid";
import { BaseDiscogsItem } from "@/types/discogs";
import { Card } from "@/components/ui/Card/Card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getCachedSearchResults = cache(async (query: string, type?: string) => {
    if (!query.trim()) return [];

    const response = await fetch(
        `${API_URL}/api/search?q=${encodeURIComponent(query)}${type ? `&type=${encodeURIComponent(type)}` : ""}`,
        { cache: "no-store" }
    );      

    if (!response.ok) {
        console.error(`🚨 API Request Failed: ${response.statusText}`);
        return [];
    }

    return await response.json();
});

export default async function SearchResultsServer({ query, type }: { query: string; type?: string }) {
    if (!query) return <p>Enter a search term to begin.</p>;

    const { results } = await getCachedSearchResults(query, type); // No forced type conversion

    return (
        <div>
            <CardGrid>
                {results.length > 0 ? (
                    results.map((item: BaseDiscogsItem, index: string) => (
                        <Card item={item} index={index} />
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </CardGrid>
        </div>
    );
}
