import { useEffect, useState } from "react";

type Theme = "dark-dim" | "light-nord";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("object0-site-theme") as Theme | null;
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark-dim"
        : "light-nord";
    }
    return "dark-dim";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("object0-site-theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === "dark-dim" ? "light-nord" : "dark-dim"));
  };

  return { theme, toggle };
}
