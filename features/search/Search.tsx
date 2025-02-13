import SearchModule from "./SearchModule"; // Client Component
import SearchResultsServer from "./SearchResultsServer"; // Server Wrapper
// import SearchResults from "./SearchResults";
import { Suspense } from "react";

export default function Search({ searchParams }: { searchParams?: { q?: string } }) {
    const query = searchParams?.q || ""; // Ensure query is extracted properly

    return (
        <div>
            <SearchModule /> {/* Handles input & form submission */}
            <Suspense fallback={<p>Loading results...</p>}>
                <SearchResultsServer query={query} />
                {/* <SearchResults query={query} /> */}
            </Suspense>
        </div>
    );
}
