"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Album } from "@/types/discogs";

interface CollectionContextType {
  collection: Album[];
  toggleCollection: (album: Album) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextType>({
  collection: [],
  toggleCollection: async () => {},
});

export const CollectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [collection, setCollection] = useState<Album[]>([]);

  // on mount, load your collection via your proxy GET
  useEffect(() => {
    fetch("/api/collection")
      .then((r) => r.json())
      .then((list: Album[]) => setCollection(list))
      .catch(console.error);
  }, []);

  const toggleCollection = async (album: Album) => {
    const entry = collection.find((c) => c.id === album.id);

    // optimistically add/remove
    setCollection((prev) =>
      entry
        ? prev.filter((c) => c.id !== album.id)
        : [...prev, { ...album, user_data: { ...album.user_data, in_collection: true } }]
    );

    try {
      if (entry) {
        const res = await fetch(
          `/api/collection/${entry.instance_id}?folderId=${entry.folder_id}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error(await res.text());
      } else {
        // Add via your proxy
        const { instanceId } = await fetch("/api/collection", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ releaseId: album.id, folderId: 0 }),
        }).then((r) => r.json());

        // replace the stub in state with the real entry
        setCollection((prev) =>
          prev.map((c) =>
            c.id === album.id
              ? {
                  ...album,
                  instance_id: instanceId,
                  folder_id:   0,
                  user_data:   { ...album.user_data, in_collection: true },
                }
              : c
          )
        );
      }
    } catch (err) {
      console.error("toggleCollection failed:", err);
      // on any failure, rollback by re-fetching
      const fresh = await fetch("/api/collection").then((r) => r.json());
      setCollection(fresh);
    }
  };

  return (
    <CollectionContext.Provider value={{ collection, toggleCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => useContext(CollectionContext);
