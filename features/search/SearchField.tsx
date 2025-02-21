"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";

export default function SearchField() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <SearchInput query={query} setQuery={setQuery} />
      <button type="submit" className="button">Search</button>
    </form>
  );
}
