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
  const albumData = parseTitle(title);

  const { collection, toggleCollection } = useCollection();
  const { wantlist, toggleWantlist } = useWantlist();
  if (!item.id) return null;
  
  const inCollection = collection.some((r) => r.id === item.id);
  const inWantlist = wantlist.some(w => w.id === item.id);
  const handleCollectionClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toggleCollection(item);
  };

  return (
    <div className="flex flex-col w-full relative">
      <div className="absolute top-0 right-0 flex gap-2">
        <>
          {inCollection ? (
            <FiMinusCircle
              className="cursor-pointer text-red-500"
              onClick={handleCollectionClick}
            />
          ) : (
            <FiPlusCircle
              className="cursor-pointer text-gray-500 dark:text-gray-300"
              onClick={handleCollectionClick}
            />
          )}
          {inWantlist ? (
            <FaStar
              className="cursor-pointer text-yellow-500"
              onClick={() => toggleWantlist(item.id)}
            />
          ) : (
            <FaRegStar
              className="cursor-pointer text-gray-500 dark:text-gray-300"
              onClick={() => toggleWantlist(item.id)}
            />
          )}
        </>
      </div>

      {/* Album Title & Artist */}
      <div className="mb-2">
        {albumData && (
          <>
            <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-sm truncate max-w-<1/2>">
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
