"use client";

import { Navigation } from "@/components/Navigation/Navigation";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export const Header = () => {
    return (
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <h2>(0)</h2>
            <Navigation />
            <ThemeToggle />
        </div>
    )
}