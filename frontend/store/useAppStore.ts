import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: "ID",
      setLanguage: (lang: string) => set({ language: lang }),
    }),
    {
      name: "cetha_lang_store", // save to localStorage
    }
  )
);
