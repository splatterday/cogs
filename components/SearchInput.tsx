"use client"; // ✅ Makes this a Client Component

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`?q=${encodeURIComponent(query)}`); // ✅ Push search term to the URL
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for an artist..."
            />
            <button type="submit">Search</button>
        </form>
    );
};
