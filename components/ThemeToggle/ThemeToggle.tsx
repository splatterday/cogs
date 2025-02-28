"use client";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <button className="button">⏳</button>; // Prevent hydration mismatch

  return (
    <button onClick={toggleTheme} className="button">
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
