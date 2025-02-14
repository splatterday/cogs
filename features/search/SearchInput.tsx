"use client";

const SearchInput = ({ query, setQuery }: { query: string; setQuery: (q: string) => void }) => {
  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="border rounded px-3 py-2 w-full"
      />
    </>
  );
};

export default SearchInput;
