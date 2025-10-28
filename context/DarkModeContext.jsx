"use client";
import { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // init from localStorage or prefers-color-scheme
    const saved = localStorage.getItem("dark-mode");
    if (saved !== null) {
      setDark(saved === "true");
    } else {
      const prefers = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefers);
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, toggle: () => setDark((v) => !v) }}>
      {children}
    </DarkModeContext.Provider>
  );
}
