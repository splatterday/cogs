"use client";

import { createContext, useContext, ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "./ThemeContext";
import { CollectionProvider } from "./CollectionContext";
import { WantlistProvider } from "./WantlistContext";

const AppContext = createContext(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider>
            <UserProvider>
                <CollectionProvider>
                    <WantlistProvider>
                        {children}
                    </WantlistProvider>
                </CollectionProvider>
            </UserProvider>
        </ThemeProvider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
