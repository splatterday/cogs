"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import { Button } from "@/components/ui/Button/Button";

export default function SearchField() {
    const router = useRouter();
    
    const [query, setQuery] = useState("");
    const [mastersOnly, setMastersOnly] = useState(false);
    const [searchType, setSearchType] = useState("release"); // Default to searching releases

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            const searchParams = new URLSearchParams();
            searchParams.set("q", query);
            searchParams.set("page", "1"); // ✅ Reset page to 1 on new search
            
            if (searchType && searchType !== "all") {
                searchParams.set("type", searchType);
            }

            if (searchType === "release" && mastersOnly) {
                searchParams.set("type", "master"); // ✅ Only request `master`, not both
            }

            router.push(`/search?${searchParams.toString()}`, { scroll: false });
        }
    };    

    return (
        <form onSubmit={handleSearch} className="flex flex-row gap-2 w-full max-w-md items-center">
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={mastersOnly}
                    disabled={searchType !== "release"} 
                    onChange={() => setMastersOnly(!mastersOnly)}
                    className="appearance-auto w-5 h-5 border border-gray-400 rounded-md checked:bg-blue-500 checked:border-transparent transition-all disabled:opacity-50"
                />
                <span className="text-gray-700 font-medium">Masters</span>
            </label>

            {/* Search Type Selector */}
            <div className="relative">
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-30 p-3 border border-gray-300 rounded-lg bg-white text-text-light shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                >
                    <option value="release">Releases</option>
                    <option value="artist">Artists</option>
                    <option value="all">All</option>
                </select>
            </div>
            <SearchInput query={query} setQuery={setQuery} />
            <Button type="submit" variant="default">
                Search
            </Button>
        </form>
    );
}
