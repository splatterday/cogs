import React from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Album } from "../../../types/discogs";
import { useWantlist } from "../../../context/WantlistContext";
import { useCollection } from "../../../context/CollectionContext";

export function AlbumCard({ item }: { item: Album }) {
  const { wantlist, toggleWantlist }       = useWantlist();
  const { collection, toggleCollection }   = useCollection();

  const inWant = wantlist.some(a => a.id === item.id);
  const inColl = collection.some(a => a.id === item.id);

  return (
    <div className="p-2 border rounded-md relative">
      <img src={item.thumb} alt={item.title} className="w-full h-auto" />
      <h3 className="mt-2 text-base font-medium">{item.title}</h3>
      <p className="text-sm text-gray-500">{item.year}</p>

      <div className="absolute top-2 right-2 flex space-x-2">
        {inColl ? (
          <FiMinusCircle
            className="cursor-pointer text-red-500"
            onClick={() => toggleCollection(item)}
          />
        ) : (
          <FiPlusCircle
            className="cursor-pointer text-gray-500"
            onClick={() => toggleCollection(item)}
          />
        )}

        {inWant ? (
          <FaStar
            className="cursor-pointer text-yellow-500"
            onClick={() => toggleWantlist(item)}
          />
        ) : (
          <FaRegStar
            className="cursor-pointer text-gray-500"
            onClick={() => toggleWantlist(item)}
          />
        )}
      </div>
    </div>
  );
}
