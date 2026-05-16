"use client";

import PageWrapper from "@/components/PageWrapper";
import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bell, Home, Camera, Lightbulb, Package, User, Coffee, Bus, Box, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { BottomNav } from "@/components/BottomNav";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [mounted, setMounted] = useState(false);
    const [chartColors, setChartColors] = useState<string[]>(['#6E1535', '#F5D5C8', '#FFF5F3', '#8A7070']); // Warna fallback
    const router = useRouter();
    const t = useLang();

    useEffect(() => {
        setMounted(true);

        // Mengambil nilai Hex asli dari CSS Variable agar bisa dibaca oleh Canvas Chart.js
        const rootStyle = getComputedStyle(document.documentElement);
        const primary = rootStyle.getPropertyValue('--primary').trim() || '#6E1535';
        const secondary = rootStyle.getPropertyValue('--secondary').trim() || '#F5D5C8';
        const border = rootStyle.getPropertyValue('--border').trim() || '#FFF5F3';
        const muted = rootStyle.getPropertyValue('--muted').trim() || '#8A7070';

        setChartColors([primary, secondary, border, muted]);

        const onboarded = localStorage.getItem("cetha_onboarded");
        if (!onboarded) {
            router.push("/onboarding");
        }
    }, [router]);

    if (!mounted) return null;

    const chartData = {
        labels: ['Bahan Baku', 'Operasional', 'Transportasi', 'Lainnya'],
        datasets: [
            {
                data: [45, 30, 15, 10],
                backgroundColor: chartColors, // Menggunakan warna murni yang sudah diekstrak
                borderWidth: 0,
                hoverOffset: 4
            },
        ],
    };

    const chartOptions = {
        cutout: '75%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => ` ${context.label}: ${context.raw}%`
                }
            }
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const transactions = [
        { id: 1, name: 'Biji Kopi Arabica 1kg', category: 'Bahan Baku', amount: 150000, icon: <Coffee className="w-5 h-5 text-[var(--primary)]" /> },
        { id: 2, name: 'Ongkir GoSend', category: 'Transportasi', amount: 25000, icon: <Bus className="w-5 h-5 text-[var(--secondary)]" /> },
        { id: 3, name: 'Susu UHT 1 Dus', category: 'Bahan Baku', amount: 180000, icon: <Box className="w-5 h-5 text-[var(--primary)]" /> },
        { id: 4, name: 'Listrik Toko', category: 'Operasional', amount: 350000, icon: <Lightbulb className="w-5 h-5 text-[var(--secondary)]" /> },
    ];

    return (
        <PageWrapper>
            <div className="w-full text-[var(--text)] relative font-sans px-5 space-y-4 pb-6">
                <header className="pt-10 pb-6 flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="/icon-512x512.png" className="w-8 h-8 object-contain"/>
                            <h1 className="text-xl font-bold text-[#1F0A0A] tracking-tight">Cetha AI</h1>
                        </div>
                        <p className="text-sm text-[#8A7070] mt-1">{t.hello}, Kedai Kopi Senja 👋</p>
                    </div>
                    <Link href="/notifications" className="p-2 bg-[var(--card)] shadow-sm rounded-full relative block">
                        <Bell className="w-5 h-5 text-[var(--text)]" />
                        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold text-white bg-[var(--primary)] rounded-full border-2 border-[var(--bg)] px-1">2</span>
                    </Link>
                </header>

                {/* Summary Cards */}
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] w-full">
                    <div className="min-w-[140px] flex-1 bg-[var(--card)] shadow-sm p-4 rounded-2xl snap-center shrink-0">
                        <p className="text-xs text-[var(--muted)] font-medium mb-2">{t.total_expense}</p>
                        <p className="text-lg font-bold text-[var(--primary)]">{formatCurrency(2450000)}</p>
                    </div>
                    <div className="min-w-[140px] flex-1 bg-[var(--card)] shadow-sm p-4 rounded-2xl snap-center shrink-0">
                        <p className="text-xs text-[var(--muted)] font-medium mb-2">{t.total_income}</p>
                        <p className="text-lg font-bold text-[#22C55E]">{formatCurrency(5800000)}</p>
                    </div>
                    <div className="min-w-[140px] flex-1 bg-[var(--card)] shadow-sm p-4 rounded-2xl snap-center shrink-0">
                        <p className="text-xs text-[var(--muted)] font-medium mb-2">{t.net_profit}</p>
                        <p className="text-lg font-bold text-[var(--secondary)]">{formatCurrency(3350000)}</p>
                    </div>
                </div>

                {/* Health Score Card */}
                <div>
                    <div className="bg-[var(--card)] shadow-sm rounded-2xl p-5 relative overflow-hidden">
                        <h2 className="text-base font-semibold text-[var(--text)] mb-4">{t.health_score}</h2>

                        <div className="flex flex-col items-center mb-6">
                            <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-4 border-[var(--primary)] bg-transparent shadow-[0_0_15px_rgba(110,21,53,0.15)]">
                                <span className="text-3xl font-bold text-[var(--primary)]">82</span>
                            </div>
                            <p className="mt-3 text-sm font-bold text-[var(--primary)]">{t.healthy} 💚</p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[var(--muted)] flex items-center gap-1">✅ {t.cash_flow}</span>
                                    <span className="text-[var(--text)] font-medium">85/100</span>
                                </div>
                                <div className="w-full bg-[var(--bg)] rounded-full h-1.5">
                                    <div className="bg-[var(--primary)] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[var(--muted)] flex items-center gap-1">✅ {t.efficiency}</span>
                                    <span className="text-[var(--text)] font-medium">78/100</span>
                                </div>
                                <div className="w-full bg-[var(--bg)] rounded-full h-1.5">
                                    <div className="bg-[var(--primary)] h-1.5 rounded-full" style={{ width: '78%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[var(--muted)] flex items-center gap-1">⚠️ {t.consistency}</span>
                                    <span className="text-[var(--text)] font-medium">65/100</span>
                                </div>
                                <div className="w-full bg-[var(--bg)] rounded-full h-1.5">
                                    <div className="bg-[var(--secondary)] h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                        </div>

                        <Link href="/health" className="w-full block text-center bg-[#FFF5F3] hover:bg-[#F5D5C8] text-sm font-bold text-[var(--primary)] py-3 rounded-xl transition-colors border border-[var(--border)]">
                            {t.detail_analysis} &rarr;
                        </Link>
                    </div>
                </div>

                {/* Expense Distribution Chart */}
                <div>
                    <h2 className="text-base font-semibold mb-4 text-[var(--text)]">{t.expense_distribution}</h2>
                    <div className="bg-[var(--card)] shadow-sm p-5 rounded-2xl flex items-center gap-6">
                        <div className="w-28 h-28 shrink-0 relative">
                            <Doughnut data={chartData} options={chartOptions} />
                        </div>
                        <div className="flex-1 space-y-2.5">
                            <div className="flex items-center text-xs">
                                <span className="w-2 h-2 rounded-full bg-[var(--primary)] mr-2"></span>
                                <span className="text-[var(--muted)] flex-1">Bahan Baku</span>
                                <span className="font-semibold text-[var(--text)]">45%</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <span className="w-2 h-2 rounded-full bg-[var(--secondary)] mr-2"></span>
                                <span className="text-[var(--muted)] flex-1">Operasional</span>
                                <span className="font-semibold text-[var(--text)]">30%</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <span className="w-2 h-2 rounded-full bg-[var(--border)] mr-2"></span>
                                <span className="text-[var(--muted)] flex-1">Transportasi</span>
                                <span className="font-semibold text-[var(--text)]">15%</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <span className="w-2 h-2 rounded-full bg-[var(--muted)] mr-2"></span>
                                <span className="text-[var(--muted)] flex-1">Lainnya</span>
                                <span className="font-semibold text-[var(--text)]">10%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Latest Transactions */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-base font-semibold text-[var(--text)]">{t.latest_transactions}</h2>
                        <Link href="/transactions" className="text-xs text-[var(--primary)] font-semibold">{t.see_all}</Link>
                    </div>
                    <div className="space-y-3">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="bg-[var(--card)] shadow-sm p-4 rounded-2xl flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#FFF5F3] flex items-center justify-center shrink-0">
                                    {tx.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm text-[var(--text)] truncate">{tx.name}</p>
                                    <p className="text-xs text-[var(--muted)] mt-0.5">{tx.category}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-bold text-sm text-[var(--primary)]">-{formatCurrency(tx.amount)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Navigation */}
                <BottomNav />
            </div>
        </PageWrapper>
    );
}