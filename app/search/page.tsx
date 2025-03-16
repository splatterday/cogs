import SearchModule from "@/features/search/SearchModule";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; page?: string; }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const type = params.type ?? undefined;
  const page = Number(params.page) || 1;

  return <SearchModule query={query} type={type} page={page} />;
}
