import Search from "@/features/search/Search";

export default function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
    return <Search searchParams={searchParams} />; // Pass whole object
}
