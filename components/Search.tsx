"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation.js";
import SearchResults from "./SearchResults.tsx";

export default function Search() {
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
            <SearchResults query={query} />
        </div>
    );
};

