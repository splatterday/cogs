"use client";

import { createContext, useContext, ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "./ThemeContext";

const AppContext = createContext(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider>
            <UserProvider>
                {children}
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
