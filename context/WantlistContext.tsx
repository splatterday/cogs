import { createContext, useContext, useEffect, useState } from "react";
import { fetchWantlist, toggleWantlist } from "@/api/discogsAPI";

interface WantlistContextType {
    wantlist: any[];
    toggleWantlist: (releaseId: string, isInWantlist: boolean) => void;
}

const WantlistContext = createContext<WantlistContextType | undefined>(undefined);

export const WantlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [wantlist, setWantlist] = useState<any[]>([]);

    useEffect(() => {
        const loadWantlist = async () => {
            const storedWantlist = localStorage.getItem("wantlist");

            if (storedWantlist) {
                console.log('STORED WANTS', storedWantlist);
                setWantlist(JSON.parse(storedWantlist));
            } else {
                const data = await fetchWantlist();
                console.log('FETCHED WANTS', data);
                setWantlist(data);
                localStorage.setItem("wantlist", JSON.stringify(data)); 
            }
        };

        loadWantlist();
    }, []);

    const handleToggleWantlist = async (releaseId: string, isInWantlist: boolean) => {
        try {
            setWantlist((prevWantlist) =>
                prevWantlist.map((item) =>
                    item.id.toString() === releaseId
                        ? { ...item, user_data: { ...item.user_data, in_wantlist: !isInWantlist } }
                        : item
                )
            );
    
            // API call to Discogs
            await toggleWantlist(releaseId, isInWantlist);
    
            // OPTIONAL: Refetch wantlist if necessary
            const updatedWantlist = await fetchWantlist();
            setWantlist(updatedWantlist);
            localStorage.setItem("wantlist", JSON.stringify(updatedWantlist));
        } catch (error) {
            console.error("Error toggling wantlist:", error);
        }
    };        

    return (
        <WantlistContext.Provider value={{ wantlist, toggleWantlist: handleToggleWantlist }}>
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
};
