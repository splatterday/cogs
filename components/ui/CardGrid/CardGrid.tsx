"use client";

import React from "react";
import { DiscogsSearchResponse } from "@/types/discogs";
import { Card } from "../Card/Card";
import { useCollection } from "@/context/CollectionContext";
import { useWantlist } from "@/context/WantlistContext";

const CardGrid = ({ items }: {items: DiscogsSearchResponse[]}) => {
  const { wantlist } = useWantlist();
  const { collection } = useCollection();

  const decoratedItems = items.map(item => {
    const entry = collection.find(c => c.id === item.id);
    return {
      ...item,
      instance_id: entry?.instance_id,
      folder_id:   entry?.folder_id,
      user_data: {
        in_wantlist:   wantlist.some(w => w.id === item.id),
        in_collection: Boolean(entry),
      },
    };
  });

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {decoratedItems.length > 0 ? (
          decoratedItems.map((item: DiscogsSearchResponse, index: number) => (
              <Card key={item.id} item={item} index={index} />
          ))
      ) : (
          <p>No results found</p>
      )}
    </main>
  );
};

export default CardGrid;
