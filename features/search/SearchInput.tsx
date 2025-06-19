"use client";

import { Input } from "@/components/ui/Input";

const SearchInput = ({ query, setQuery }: { query: string; setQuery: (q: string) => void }) => {
  return (
    <Input
      id="search"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
      data-testid="search-input"
      className="w-auto max-w-[400px]"
    />
  );
};

export default SearchInput;
