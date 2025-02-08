import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
    currTheme: localStorage.getItem("chat-theme") || "light",

    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme)
        set({ currTheme: theme })
    }
}))