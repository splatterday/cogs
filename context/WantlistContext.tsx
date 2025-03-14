import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Album } from "../types/discogs";
import * as API from "../lib/discogsAPI";

interface WantlistContextType {
  wantlist: Album[];
  toggleWantlist: (releaseId: number) => Promise<void>;
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
    API.fetchWantlist()
      .then((fresh) => setWantlist(fresh))
      .catch((err) => console.error("Wantlist fetch failed:", err));
  }, []);

  const toggleWantlist = async (releaseId: number) => {
    const exists = wantlist.some((a) => a.id === releaseId);
    // optimistic update
    setWantlist((prev) =>
      exists ? prev.filter((a) => a.id !== releaseId) : [...prev, { id: releaseId } as Album]
    );
    try {
      if (exists) await API.removeWant(releaseId);
      else        await API.addWant(releaseId);
    } catch (err) {
      console.error("Toggle want item failed:", err);
      // rollback
      API.fetchWantlist().then((fresh) => setWantlist(fresh));
    }
  };

  return (
    <WantlistContext.Provider value={{ wantlist, toggleWantlist }}>
      {children}
    </WantlistContext.Provider>
  );
};

export const useWantlist = () => useContext(WantlistContext);
