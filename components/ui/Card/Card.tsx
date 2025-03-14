"use client";

import Image from "next/image";
import React from "react";
import type { Album, DiscogsSearchResponse } from "@/types/discogs";

interface CardProps {
    item: DiscogsSearchResponse;
    index?: string;
}

export function Card({ item, index }: CardProps) {
    console.log(item);
    const isAlbum = (item: DiscogsSearchResponse): item is Album => {
        return (item as Album).year !== undefined;
    };

    const imageSrc = item.cover_image || item.thumb || "/images/placeholder.png";
    const title = item.title ?? "Untitled";

    return (
        <div
        className="
            flex flex-col items-center space-x-4
            p-4
            border border-gray-200 dark:border-gray-700
            rounded-md shadow-sm
            bg-white dark:bg-gray-800
        "
        data-index={index}
        >
            <div className="flex flex-col">
                <h3 className="text-gray-800 dark:text-gray-100 font-semibold">
                {title}
                </h3>
                {isAlbum(item) && (
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    Year: {item.year ?? "N/A"}
                </p>
                )}
            </div>
            <Image
                src={imageSrc}
                alt={title}
                width={0}
                height={0}
                sizes="80px"
                className="w-20 h-auto object-cover rounded"
            />
        </div>
    );
}
