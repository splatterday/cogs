// context/WantlistContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Album } from "../types/discogs";
import * as API from "../api/discogsAPI";

const CACHE_KEY   = "wantlist_cache";
const CACHE_VER   = "wantlist_ver";
const CURRENT_VER = "v1";

interface WantlistContextType {
  wantlist: Album[];
  toggleWantlist: (album: Album) => Promise<void>;
}

const WantlistContext = createContext<WantlistContextType>({
  wantlist: [],
  toggleWantlist: async () => {},
});

export const WantlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [wantlist, setWantlist] = useState<Album[]>([]);

  useEffect(() => {
    if (localStorage.getItem(CACHE_VER) !== CURRENT_VER) {
      localStorage.removeItem(CACHE_KEY);
      localStorage.setItem(CACHE_VER, CURRENT_VER);
    }

    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      setWantlist(JSON.parse(raw));
    }

    API.fetchWantlist().then(fresh => {
      setWantlist(fresh);
      localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
    });
  }, []);

  const toggleWantlist = async (album: Album) => {
    const exists = wantlist.some(a => a.id === album.id);
    const next = exists
      ? wantlist.filter(a => a.id !== album.id)
      : [...wantlist, album];

    setWantlist(next);
    localStorage.setItem(CACHE_KEY, JSON.stringify(next));

    try {
      if (exists) await API.removeWant(album.id);
      else        await API.addWant(album.id);
    } catch {
      setWantlist(wantlist);
      localStorage.setItem(CACHE_KEY, JSON.stringify(wantlist));
    }
  };

  return (
    <WantlistContext.Provider value={{ wantlist, toggleWantlist }}>
      {children}
    </WantlistContext.Provider>
  );
};

export const useWantlist = () => useContext(WantlistContext);
