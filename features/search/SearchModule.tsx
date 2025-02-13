"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchInput from "./SearchInput";

export default function SearchModule() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [query, setQuery] = useState(searchParams.get("q") || ""); // Controlled input

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
        }
    };

    return (
        <div>
            <SearchInput query={query} setQuery={setQuery} />
            <button type="submit" onClick={(e) => handleSearch(e)}>Search</button> {/* Trigger search */}
        </div>
    );
}
