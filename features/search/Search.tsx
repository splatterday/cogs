import SearchModule from "./SearchModule";
import SearchResultsServer from "./SearchResultsServer";
import { Suspense } from "react";

export default function Search({ searchParams }: { searchParams?: { q?: string } }) {
    return (
        <div>
            <SearchModule />
            <Suspense fallback={<p>Loading results...</p>}>
                <SearchResultsServer query={searchParams?.q || ""} />
            </Suspense>
        </div>
    );
}

