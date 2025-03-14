"use client";

import Image from "next/image";
import React from "react";
import type { DiscogsSearchResponse } from "@/types/discogs";

interface ArtistCardProps {
  item: DiscogsSearchResponse;
}

export function ArtistCard({ item }: ArtistCardProps) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-sm mb-2">
        {item.title}
      </h3>
      <div className="relative w-32 h-32">
        <Image
          src={item.cover_image ?? ""}
          alt={item.title ?? "Artist Image"}
          fill
          className="object-cover rounded"
          sizes="80px"
        />
      </div>
    </div>
  );
}
