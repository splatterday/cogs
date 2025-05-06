// context/CollectionContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Album } from "../types/discogs";
import * as API from "../api/discogsAPI";

const CACHE_KEY   = "collection_cache";
const CACHE_VER   = "collection_ver";
const CURRENT_VER = "v1";

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

  useEffect(() => {
    if (localStorage.getItem(CACHE_VER) !== CURRENT_VER) {
      localStorage.removeItem(CACHE_KEY);
      localStorage.setItem(CACHE_VER, CURRENT_VER);
    }

    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      setCollection(JSON.parse(raw));
    }

    API.fetchCollection().then(fresh => {
      setCollection(fresh);
      localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
    });
  }, []);

  const toggleCollection = async (album: Album) => {
    const exists = collection.some(a => a.id === album.id);
    const next = exists
      ? collection.filter(a => a.id !== album.id)
      : [...collection, album];

    setCollection(next);
    localStorage.setItem(CACHE_KEY, JSON.stringify(next));

    try {
      if (exists) await API.removeCollection(album.id);
      else        await API.addCollection(album.id);
    } catch {
      setCollection(collection);
      localStorage.setItem(CACHE_KEY, JSON.stringify(collection));
    }
  };

  return (
    <CollectionContext.Provider value={{ collection, toggleCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => useContext(CollectionContext);
