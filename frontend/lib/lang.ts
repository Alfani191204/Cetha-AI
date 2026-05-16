export const translations = {
  ID: { 
    greeting: "Halo", 
    scan: "Scan", 
    insight: "Insight", 
    stock: "Stok",
    profile: "Profil", 
    dashboard: "Dashboard" 
  },
  EN: { 
    greeting: "Hello", 
    scan: "Scan",
    insight: "Insight", 
    stock: "Stock",
    profile: "Profile", 
    dashboard: "Dashboard" 
  }
} as const;

export type LanguageCode = keyof typeof translations;
