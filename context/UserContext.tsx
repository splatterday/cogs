"use client";

import { createContext, useContext } from "react";

const UserContext = createContext<string | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const username = process.env.NEXT_PUBLIC_DISCOGS_USERNAME || "";

    return <UserContext.Provider value={username}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
