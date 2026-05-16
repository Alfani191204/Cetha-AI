export const translations = {
  ID: {
    dashboard: "Dashboard", scan: "Scan",
    insight: "Insight", stock: "Stok",
    profile: "Profil", hello: "Halo",
    latest_transactions: "Transaksi Terbaru",
    see_all: "Lihat Semua",
    health_score: "Skor Kesehatan Keuangan",
    healthy: "Sehat", cash_flow: "Arus Kas",
    efficiency: "Efisiensi", consistency: "Konsistensi",
    expense_distribution: "Distribusi Pengeluaran",
    total_expense: "Total Pengeluaran",
    total_income: "Total Pemasukan",
    net_profit: "Laba Bersih",
    detail_analysis: "Lihat Detail Analisis",
    language: "Bahasa", dark_mode: "Mode Gelap",
    edit_profile: "Edit Profil",
    help: "Bantuan", logout: "Keluar dari Akun",
  },
  EN: {
    dashboard: "Dashboard", scan: "Scan",
    insight: "Insight", stock: "Stock",
    profile: "Profile", hello: "Hello",
    latest_transactions: "Recent Transactions",
    see_all: "See All",
    health_score: "Financial Health Score",
    healthy: "Healthy", cash_flow: "Cash Flow",
    efficiency: "Efficiency", consistency: "Consistency",
    expense_distribution: "Expense Distribution",
    total_expense: "Total Expense",
    total_income: "Total Income",
    net_profit: "Net Profit",
    detail_analysis: "View Detail Analysis",
    language: "Language", dark_mode: "Dark Mode",
    edit_profile: "Edit Profile",
    help: "Help", logout: "Sign Out",
  }
};

export function useLang() {
  if (typeof window === "undefined") return translations.ID;
  const lang = localStorage.getItem("cetha_lang") || "ID";
  return translations[lang as "ID" | "EN"];
}
