import { Suspense } from "react";
import SearchField from "./SearchField";
import SearchResultsServer from "./SearchResultsServer";

type SearchType = "release" | "artist" | "master";

interface SearchModuleProps {
  query?: string;
  type?: string;
  page?: number;
}

export default function SearchModule({
  query = "",
  type,
  page = 1,
}: SearchModuleProps) {
  const searchType: SearchType = 
    type === "artist" || type === "master" || type === "release"
      ? type
      : "release";

  const searchPage = Number.isInteger(page) && page > 0 ? page : 1;

  return (
    <div>
      <SearchField />

      <Suspense fallback={<p>Loading results…</p>}>
        <SearchResultsServer
          query={query}
          type={searchType}
          page={searchPage}
        />
      </Suspense>
    </div>
  );
}
