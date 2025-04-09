"use client";

import React from "react";
import type { Album, DiscogsSearchResponse } from "@/types/discogs";
import { AlbumCard } from "./AlbumCard";
import { ArtistCard } from "./ArtistCard";

/**
 * Parent Card component.
 * It acts as a router: based on the type of data provided,
 * it renders either an AlbumCard or an ArtistCard.
 */
export function Card({ item, index }: { item: DiscogsSearchResponse; index?: number; }) {
  const isAlbum = (item: DiscogsSearchResponse): item is Album =>
    (item as Album).year !== undefined;

  // Optional: Wrap in a common container with shared styles.
  return (
    <div
      className="
        rounded-lg border border-highlight-light dark: border-highlight-dark bg-primary-light dark:bg-primary-dark p-4 shadow-sm
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
