import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Album } from "@/types/discogs";
import * as discogsAPI from "../api/discogsAPI";

interface CollectionContextType {
  collection: Album[];
  toggleCollection: (album: Album) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextType>({
  collection: [],
  toggleCollection: async () => {},
});

export const CollectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collection, setCollection] = useState<Album[]>([]);

  useEffect(() => {
    discogsAPI.fetchCollection().then(setCollection);
  }, []);

  const toggleCollection = async (album: Album) => {
    const exists = collection.some(a => a.id === album.id);
    if (exists) {
      setCollection(prev => prev.filter(a => a.id !== album.id));
      await discogsAPI.removeCollection(album.id);
    } else {
      setCollection(prev => [...prev, album]);
      await discogsAPI.addCollection(album.id);
    }
  };

    return (
        <CollectionContext.Provider value={{ collection, toggleCollection }}>
            {children}
        </CollectionContext.Provider>
    );
};

export const useCollection = () => {
    const context = useContext(CollectionContext);
    if (!context) {
        throw new Error("useCollection must be used within a CollectionProvider");
    }
    return context;
};
