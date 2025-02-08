"use client"; // ✅ Ensure it's a Client Component

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchResults from "@components/SearchResults";

const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {``
            router.push(`?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div>
            <h1>Search for Albums</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter artist name..."
                />
                <button type="submit">Search</button>
            </form>

            {/* ✅ Pass the query to the new SearchResults component */}
            <SearchResults query={query} />
        </div>
    );
};

export default Search;
