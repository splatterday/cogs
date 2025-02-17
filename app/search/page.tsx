// app/search/page.tsx
export const dynamic = "force-dynamic";

import SearchModule from "@/features/search/SearchModule";

export default async function Search({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q || "";
  return <SearchModule query={query} />;
}
