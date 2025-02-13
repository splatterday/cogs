// app/search/page.tsx
import SearchModule from "@/features/search/SearchModule"; // Server Component

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";

  return <SearchModule query={query} />;
}
