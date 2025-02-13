"use client";

import { createContext, useContext, ReactNode } from "react";
import { UserProvider } from "./UserContext";
// In the future, you can add more providers here (e.g., ThemeProvider, AuthProvider, etc.)

const AppContext = createContext(null);

// This will wrap all other context providers
export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
};

// Custom hook to use AppContext (extend as needed)
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
