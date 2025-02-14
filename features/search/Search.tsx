import { Suspense } from "react";
import SearchModule from "./SearchModule"; // client component
import SearchResultsServer from "./SearchResultsServer"; // server component

export default function Search({ query }: { query?: string }) {
    return (
        <div>
            <SearchModule />
            <Suspense fallback={<p>Loading results...</p>}>
                <SearchResultsServer query={query || ""} />
            </Suspense>
        </div>
    );
};
