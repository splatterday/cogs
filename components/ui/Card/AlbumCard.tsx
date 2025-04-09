"use client";

import Image from "next/image";
import React from "react";
import type { Album } from "@/types/discogs";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useCollection } from "@/context/CollectionContext";
import { useWantlist } from "@/context/WantlistContext";
import { parseTitle } from "@/helpers/transform";

interface AlbumCardProps {
  item: Album;
}

export function AlbumCard({ item }: AlbumCardProps) {
  const title = item.title ?? "Untitled";
  const albumData = parseTitle(title); // Assumes returns { album: string, artist: string }

  const { toggleCollection } = useCollection();
  const { toggleWantlist } = useWantlist();
  const itemId = item.id?.toString();
  if (!itemId) return null;

  return (
    <div className="flex flex-col w-full relative">
      {/* Top-right action icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        {item.user_data && (
          <>
            {item.user_data.in_collection ? (
              <FiMinusCircle
                className="cursor-pointer text-red-500"
                onClick={() => toggleCollection(itemId, item.user_data?.in_collection ?? false)}
              />
            ) : (
              <FiPlusCircle
                className="cursor-pointer text-gray-500 dark:text-gray-300"
                onClick={() => toggleCollection(itemId, item.user_data?.in_collection ?? false)}
              />
            )}
            {item.user_data.in_wantlist ? (
              <FaStar
                className="cursor-pointer text-yellow-500"
                onClick={() => toggleWantlist(itemId, item.user_data?.in_wantlist ?? false)}
              />
            ) : (
              <FaRegStar
                className="cursor-pointer text-gray-500 dark:text-gray-300"
                onClick={() => toggleWantlist(itemId, item.user_data?.in_wantlist ?? false)}
              />
            )}
          </>
        )}
      </div>

      {/* Album Title & Artist */}
      <div className="mb-2">
        {albumData && (
          <>
            <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-sm truncate">
              {albumData.album}
            </h3>
            <h4 className="text-gray-600 dark:text-gray-300 text-xs truncate">
              {albumData.artist}
            </h4>
          </>
        )}
      </div>

      {/* Album Image & Additional Info */}
      <div className="flex gap-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={item.cover_image ?? ""}
            alt={item.title ?? "Album Cover"}
            fill
            className="object-cover rounded"
            sizes="80px"
          />
        </div>
        <div className="flex flex-col text-xs">
          <p className="text-gray-800 dark:text-gray-100">{item.year} {item.catno}</p>
          <p className="text-gray-600 dark:text-gray-300">{item.country}</p>
          {item.formats && item.formats.length > 0 && item.formats[0].descriptions ? (
            <div className="flex flex-col">
              <p className="truncate">
                {item.formats[0].descriptions.map((desc, i) => (
                  <span key={i} className="mr-1">{desc}</span>
                ))}
              </p>
              <p className="truncate">{item.formats[0].text}</p>
            </div>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>
    </div>
  );
}
