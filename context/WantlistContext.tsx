import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
  } from "react";
  import * as discogsAPI from "@/api/discogsAPI";
import { Album } from "@/types/discogs";
  
  interface WantlistContextType {
    wantlist: Album[];
    toggleWantlist: (album: Album) => Promise<void>;
  }
  
  const WantlistContext = createContext<WantlistContextType>({
    wantlist: [],
    toggleWantlist: async () => {},
  });
  
  export const WantlistProvider = ({ children }: { children: ReactNode }) => {
    const [wantlist, setWantlist] = useState<Album[]>([]);
  
    useEffect(() => {
      (async () => {
        const data = await discogsAPI.fetchWantlist();
        setWantlist(data);
      })();
    }, []);
  
    const toggleWantlist = async (album: Album) => {
        const exists = wantlist.some((a) => a.id === album.id);
    
        if (exists) {
          setWantlist((prev) => prev.filter((a) => a.id !== album.id));
          await discogsAPI.removeWant(album.id);
        } else {
          setWantlist((prev) => [...prev, album]);
          await discogsAPI.addWant(album.id);
        }
      };
  
    return (
      <WantlistContext.Provider value={{ wantlist, toggleWantlist }}>
        {children}
      </WantlistContext.Provider>
    );
  };

  export const useWantlist = () => {
    const context = useContext(WantlistContext);
    if (!context) {
        throw new Error("useWantlist must be used within a WantlistProvider");
    }
    return context;
}
  