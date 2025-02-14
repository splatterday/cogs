import Search from "@/features/search/Search";

export default async function SearchPage({ searchParams,}: { searchParams: { q?: string }; }) {
    const query = searchParams?.q || "";

    return <Search query={query} />;
};
