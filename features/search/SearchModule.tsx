import { Suspense } from "react";
import SearchField from "./SearchField"; // client component
import SearchResultsServer from "./SearchResultsServer"; // server component

export default function SearchModule({ query, type }: { query: string; type?: string }) {
    return (
        <div>
            <SearchField />
            <Suspense fallback={<p>Loading results...</p>}>
                <SearchResultsServer query={query} type={type} />
            </Suspense>
        </div>
    );
};
