import CardGrid from "@/components/ui/CardGrid/CardGrid";
import { BaseDiscogsItem } from "@/types/discogs";
import Pagination from "@/components/ui/Pagination/Pagination";
import { Card } from "@/components/ui/Card/Card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getCachedSearchResults =
    async (query: string, type?: "artist" | "release" | "master", page = 1) => {
        if (!query.trim()) return { results: [], totalPages: 1 };

        const params = new URLSearchParams();
        params.set("q", query);
        if (type) params.set("type", type);
        params.set("page", page.toString());

        console.log("Fetching Search Results with Params:", { query, type, page });

        const response = await fetch(`${API_URL}/api/search?${params.toString()}`, { cache: "no-store" });

        if (!response.ok) {
            console.error(`API Request Failed: ${response.statusText}`);
            return { results: [], totalPages: 1 };
        }

        return await response.json();
    };

export default async function SearchResultsServer({
    query,
    type,
    page,
}: {
    query: string;
    type?: string;
    page: number;
}) {
    if (!query) return <p>Enter a search term to begin.</p>;

    console.log("Fetching Search Results with Params:", { query, type, page });

    const { results, totalPages } = await getCachedSearchResults(query, type as "artist" | "release" | "master", page);

    return (
        <div>
            {totalPages > 1 ? <Pagination currentPage={page} totalPages={totalPages} /> : null}
            <CardGrid>
                {results.length > 0 ? (
                    results.map((item: BaseDiscogsItem, index: number) => (
                        <Card item={item} key={index} />
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </CardGrid>
            {totalPages > 1 ? <Pagination currentPage={page} totalPages={totalPages} /> : null}
        </div>
    );
}
