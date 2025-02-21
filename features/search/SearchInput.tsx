"use client";

const SearchInput = ({ query, setQuery }: { query: string; setQuery: (q: string) => void }) => {
  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />
    </>
  );
};

export default SearchInput;
