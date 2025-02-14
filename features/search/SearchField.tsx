"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import styles from "./SearchField.module.scss";

export default function SearchModule() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchField}>
      <SearchInput query={query} setQuery={setQuery} />
      <button type="submit">Search</button>
    </form>
  );
}
