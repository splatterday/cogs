"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../Button/Button";
import { Input } from "../Input";

export default function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "release";

    const [inputPage, setInputPage] = useState(currentPage.toString());

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;

        const params = new URLSearchParams();
        params.set("q", query);
        params.set("type", type);
        params.set("page", page.toString());

        router.push(`/search?${params.toString()}`, { scroll: false });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const pageNumber = Number(inputPage);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            goToPage(pageNumber);
        }
    };

    return (
        <div className="flex items-center gap-4 mt-4">
            {/* Previous Button */}
            {currentPage > 1 && (
                <Button onClick={() => goToPage(currentPage - 1)} variant="pagination">
                    Previous
                </Button>
            )}

            {/* Page Input Field */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span>Page</span>
                <Input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={inputPage}
                    onChange={(e) => setInputPage(e.target.value)}
                    className="w-10 p-2 text-center border rounded dark:text-text"
                />
                <span>of {totalPages}</span>
            </form>

            {/* Next Button */}
            {currentPage < totalPages && (
                <Button onClick={() => goToPage(currentPage + 1)} variant="default">
                    Next
                </Button>
            )}
        </div>
    );
}
