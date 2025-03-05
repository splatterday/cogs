import SearchModule from "@/features/search/SearchModule";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const type = params.type ?? undefined;

  return <SearchModule query={query} type={type} />;
}
