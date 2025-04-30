import { createContext, useContext, useEffect, useState } from "react";
import * as discogsAPI from "@/api/discogsAPI";

interface CollectionContextType {
    collection: any[];
    toggleCollection: (releaseId: number) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextType | undefined>({
    collection: [],
    toggleCollection: async () => {},
});

export const CollectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [collection, setCollection] = useState<any[]>([]);
    
    useEffect(() => {
        const loadCollection = async () => {
            const storedCollection = localStorage.getItem("collection");

            if (storedCollection) {
                setCollection(JSON.parse(storedCollection));
            } else {
                const data = await discogsAPI.fetchCollection();
                setCollection(data);
                localStorage.setItem("collection", JSON.stringify(data)); 
            }
        };

        loadCollection();
    }, []);


    const toggleCollection = async (releaseId: number) => {
      const isPresent = collection.some((r) => r.id === releaseId);

      setCollection((prev) =>
        isPresent
          ? prev.filter((r) => r.id !== releaseId)
          : [
              ...prev,
              { id: releaseId, title: "", year: 0, thumb: "" },
            ]
      );
  
      try {
        if (isPresent) {
          await discogsAPI.toggleCollection(releaseId, false);
        } else {
          await discogsAPI.toggleCollection(releaseId, true);
        }
      } catch (err) {
        console.error("Collection toggle failed:", err);
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
