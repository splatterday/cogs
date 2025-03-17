"use client";

const SearchInput = ({ query, setQuery }: { query: string; setQuery: (q: string) => void }) => {
  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-15 m-3 p-3 border border-gray-300 bg-background-light text-text-light 
             rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light 
             dark:border-background-light dark:bg-background-light dark:text-text-light 
             dark:focus:ring-primary-dark"
        data-testid="search-input"
      />
    </>
  );
};

export default SearchInput;
