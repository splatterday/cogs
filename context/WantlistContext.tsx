import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
  } from "react";
  import * as discogsAPI from "@/api/discogsAPI";
  
  export interface Release {
    id: number;
    title: string;
    year: number;
    thumb: string;
  }
  
  interface WantlistContextType {
    wantlist: Release[];
    toggleWantlist: (releaseId: number) => Promise<void>;
  }
  
  const WantlistContext = createContext<WantlistContextType>({
    wantlist: [],
    toggleWantlist: async () => {},
  });
  
  export const WantlistProvider = ({ children }: { children: ReactNode }) => {
    const [wantlist, setWantlist] = useState<Release[]>([]);
  
    useEffect(() => {
      (async () => {
        const data = await discogsAPI.fetchWantlist();
        setWantlist(data);
      })();
    }, []);
  
    const toggleWantlist = async (releaseId: number) => {
      const isPresent = wantlist.some((r) => r.id === releaseId);

      setWantlist((prev) =>
        isPresent
          ? prev.filter((r) => r.id !== releaseId)
          : [
              ...prev,
              { id: releaseId, title: "", year: 0, thumb: "" },
            ]
      );
  
      try {
        if (isPresent) {
          await discogsAPI.toggleWantlist(releaseId, false);
        } else {
          await discogsAPI.toggleWantlist(releaseId, true);
        }
      } catch (err) {
        console.error("Wantlist toggle failed:", err);
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
  