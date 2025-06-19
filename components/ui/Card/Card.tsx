"use client";

import React from "react";
import type { Album, DiscogsSearchResponse } from "@/types/discogs";
import { AlbumCard } from "./AlbumCard";
import { ArtistCard } from "./ArtistCard";

export function Card({ item, index }: { item: DiscogsSearchResponse; index?: number; }) {
  const isAlbum = (item: DiscogsSearchResponse): item is Album =>
    (item as Album).year !== undefined;

  return (
    <div
      className="
        rounded-lg border border-highlight dark: border-highlight-dark bg-primary dark:bg-primary-dark p-4 shadow-sm
        flex items-start
      "
      data-index={index}
    >
      {isAlbum(item) ? (
        <AlbumCard item={item} />
      ) : (
        <ArtistCard item={item} />
      )}
    </div>
  );
}
