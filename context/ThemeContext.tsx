"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") as Theme : null;
  const systemPrefersDark =
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

  const [theme, setTheme] = useState<Theme>(initialTheme); // Set initial value immediately

  useEffect(() => {
    const themeCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="))
      ?.split("=")[1];

      if (themeCookie === "light" || themeCookie === "dark") {
        setTheme(themeCookie);
      } else {
        setTheme("light");
      }      
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.cookie = `theme=${theme}; path=/;`; // store for next time
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev: Theme) => {
      const newTheme = prev === "light" ? "dark" : "light";
      return newTheme;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
