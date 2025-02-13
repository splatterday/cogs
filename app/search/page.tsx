import Search from "@/features/search/Search";

export default function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {

    return (
        <div>
            <h1>Home</h1>
            <Search searchParams={searchParams} />
        </div>
    );
}
