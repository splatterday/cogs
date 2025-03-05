"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";

export default function SearchField() {
    const router = useRouter();
    
    const [query, setQuery] = useState("");
    const [mastersOnly, setMastersOnly] = useState(false);
    const [searchType, setSearchType] = useState("release");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            const searchParams = new URLSearchParams();
            searchParams.set("q", query);
    
            let finalType = searchType;
            if (searchType === "release" && mastersOnly) {
                finalType = "master";
            }
    
            if (finalType !== "all") {
                searchParams.set("type", finalType);
            }
    
            router.push(`/search?${searchParams.toString()}`, { scroll: false });
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-col gap-4 w-full max-w-md">
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={mastersOnly}
                    disabled={searchType !== "release"}
                    onChange={() => setMastersOnly(!mastersOnly)}
                    className="appearance-auto w-5 h-5 border border-gray-400 rounded-md checked:bg-blue-500 checked:border-transparent transition-all disabled:opacity-50"
                />
                <span className="text-gray-700 font-medium">Masters only</span>
            </label>

            <div className="relative">
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-text-light shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                >
                    <option value="release">Releases</option>
                    <option value="artist">Artists</option>
                </select>
            </div>

            <SearchInput query={query} setQuery={setQuery} />

            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all">
                Search
            </button>
        </form>
    );
}
