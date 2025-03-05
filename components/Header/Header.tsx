"use client";

import { Navigation } from "@/components/Navigation/Navigation";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export const Header = () => {
    return (
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <h2>
                <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white">
                    <img src="/favicon.svg" alt="Favicon" className="h-8 w-8" />
                </div>
            </h2>
            <Navigation />
            <ThemeToggle />
        </div>
    )
}