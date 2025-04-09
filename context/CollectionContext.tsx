import { createContext, useContext, useEffect, useState } from "react";
import { fetchCollection, toggleCollection } from "@/api/discogsAPI";

interface CollectionContextType {
    collection: any[];
    toggleCollection: (releaseId: string, isInCollection: boolean) => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [collection, setCollection] = useState<any[]>([]);
    
    useEffect(() => {
        const loadCollection = async () => {
            const storedCollection = localStorage.getItem("collection");

            if (storedCollection) {
                console.log('STORED COLL', storedCollection);
                setCollection(JSON.parse(storedCollection));
            } else {
                const data = await fetchCollection();
                console.log('FETCHED COLL', data);
                setCollection(data);
                localStorage.setItem("collection", JSON.stringify(data)); 
            }
        };

        loadCollection();
    }, []);

    const handleToggleCollection = async (releaseId: string, isInCollection: boolean) => {
        try {
            setCollection((prevCollection) =>
                prevCollection.map((item) =>
                    item.id.toString() === releaseId
                        ? { ...item, user_data: { ...item.user_data, in_collection: !isInCollection } }
                        : item
                )
            );
    
            // API call to Discogs
            await toggleCollection(releaseId, isInCollection);
    
            // OPTIONAL: Refetch collection if necessary
            const updatedCollection = await fetchCollection();
            setCollection(updatedCollection);
            localStorage.setItem("collection", JSON.stringify(updatedCollection));
        } catch (error) {
            console.error("Error toggling collection:", error);
        }
    };    

    return (
        <CollectionContext.Provider value={{ collection, toggleCollection: handleToggleCollection }}>
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
