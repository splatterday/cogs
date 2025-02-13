"use client";

import { Suspense, useState } from "react";
import SearchResults from "./SearchResults";
import SearchInput from "./SearchInput";
import Loading from "@/components/Loading/Loading";

export default function Search({
    searchParams,
}: {
    searchParams?: { q?: string };
}) {
    const [query, setQuery] = useState(searchParams?.q || "");

    return (
        <div>
            <SearchInput query={query} setQuery={setQuery} />
            <Suspense fallback={<Loading />}>
                <SearchResults query={query} />
            </Suspense>
        </div>
    );
}
