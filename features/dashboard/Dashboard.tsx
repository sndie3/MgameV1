import { Search, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import PatternOne from "./components/layouts/PatternOne";
import PatternTwo from "./components/layouts/PatternTwo";
import PatternThree from "./components/layouts/PatternThree";
import SkeletonLayout from "./components/layouts/SkeletonLayout";
import { useInfiniteGames } from "./hooks/useInfiniteGames";
import { MockGameProvider } from "./providers/MockGameProvider";
import { getUsername } from "./services/profileStorage.service";
// import { ApiGameProvider } from "./providers/ApiGameProvider"; // Swap here for production
import Sidebar from "./components/Sidebar";
import { useNavigate } from "react-router-dom";
import WalletModal from "./components/WalletModal";

// Instantiate provider outside component to avoid recreation on re-renders
const gameProvider = new MockGameProvider();

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [walletOpen, setWalletOpen] = useState(false);

    const [verificationStatus] = useState<string>(() => {
        const status = localStorage.getItem('verificationStatus');
        return status ? status.toUpperCase() : "Fully Verified";
    });
    const [username] = useState<string>(() => {
        return getUsername() || "Player";
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menus = [
        {
            icon: "/assets/icons/Nav1.png",
            title: "Pinoy Games",
            count: "3",
            route: "/pinoy-games"
        },
        {
            icon: "/assets/icons/Nav2.png",
            title: "E-Casino",
            count: "3,247",
            route: "/e-casino"

        },
        {
            icon: "/assets/icons/Nav3.png",
            title: "E-Bingo",
            count: "12",
            route: "/e-bingo"

        },
        {
            icon: "/assets/icons/Nav4.png",
            title: "Cash-In",
            route: "/cash-in"

        },
        {
            icon: "/assets/icons/Nav5.png",
            title: "Cash-Out",
            route: "/cash-out"

        },
        {
            icon: "/assets/icons/Nav6.png",
            title: "Support",
            route: "/support"
        },
    ];

    const tabs = [
        { label: "Recently Played " },
        { label: "Invite", icon: "/assets/icons/invite.png" },
        { label: "Rewards" },
        { label: "EPT" },
    ];

    const { layouts, isLoading, hasMore, loadMore } = useInfiniteGames(gameProvider, 21);
    const navigate = useNavigate();
    const observerTarget = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for prefetching infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            },
            {
                root: scrollContainerRef.current,
                // Expand the root margin downwards to trigger prefetch early
                rootMargin: '0px 0px 400px 0px',
                threshold: 0
            }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loadMore, layouts.length]);

    return (
        <div className="relative min-h-screen text-white overflow-hidden">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                username={username}
                verificationStatus={verificationStatus}
            />
            {/* Header */}
            <div className="px-8 xl:px-5 pt-4">
                <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--button-color)' }}>
                            <img src="/assets/icons/burger.png" alt="Avatar" className="w-7 h-3 " />
                        </button>

                        <div>
                            <h2 className="font-semibold uppercase tracking-wide">
                                {username}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {verificationStatus.includes('*') ? (
                                    <>
                                        {verificationStatus.replace('*', '')}
                                        <span className="text-red-500">*</span>
                                    </>
                                ) : (
                                    verificationStatus
                                )}
                            </p>
                        </div>
                    </div>

                    <span onClick={() => setWalletOpen(true)} className="text-lg font-semibold flex place-items-center cursor-pointer font-bahnschrift ">
                        <img src="/assets/icons/wallet2.png" alt="" className="w-14 wallet-pulse" />
                        {/* WALLET */}
                    </span>
                </div>
            </div>

            {/* Header Tab */}
            {/* THIS WILL DISPLAY IF THE USER IS FULLY VERIFIED */}
            <div className="grid grid-cols-4 gap-1 mt-2 px-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className="py-4 text-sm font-semibold hover:opacity-80 bg-[#1d1d1d] hover:bg-[#252525]"
                    >
                        <div className="flex items-center justify-center gap-2">
                            {tab.icon && (
                                <img src={tab.icon} alt={tab.label} className="w-7 h-7" />
                            )}
                            {tab.label}
                        </div>

                    </button>
                ))}
            </div>
            {/* THIS WILL DISPLAY IF USER IS NOT SEMI VERIFIED */}
            <div className="px-2 mt-4 space-y-3">
                <button className="w-full rounded-xl bg-[#1d1d1d] py-4 text-center font-semibold hover:bg-[#252525]">
                    Complete Semi Verification and get ₱20.
                </button>
                {/* THIS WILL DISPLAY IF USER IS SEMI VERIFIED BUT NOT FULL VERIFIED */}
                <button className="w-full rounded-xl bg-[#1d1d1d] py-4 text-center font-semibold hover:bg-[#252525]">
                    Complete Full Verification to receive ₱30.
                </button>
            </div>

            {/* Contents / Game Cards Grid */}
            <div ref={scrollContainerRef} className="overflow-y-auto h-[calc(95vh-120px)] px-5 pt-4">
                <div className="space-y-2">
                    {layouts.map((group, index) => {
                        if (group.layout === 'pattern1') {
                            return <PatternOne key={`pattern1-${index}`} games={group.games} />;
                        }
                        if (group.layout === 'pattern2') {
                            return <PatternTwo key={`pattern2-${index}`} games={group.games} />;
                        }
                        if (group.layout === 'pattern3') {
                            return <PatternThree key={`pattern3-${index}`} games={group.games} />;
                        }
                        return null;
                    })}

                    {/* Loading Skeletons */}
                    {isLoading && <SkeletonLayout />}

                    {/* Intersection Observer Target */}
                    <div ref={observerTarget} className="h-10 w-full" />
                </div>
            </div>

            {/* Bottom Navbar*/}
            <div
                className={` fixed bottom-0 left-0 right-0 z-30
        rounded-t-3xl
        bg-[var(--card-color)]
        transition-all duration-500
        ${collapsed ? "h-14" : "h-[430px]"}`}
            >
                {/* Search */}
                <div className="border-b border-white/10 flex items-center px-4 h-14">
                    <Search size={18} className="text-gray-500" />

                    <input
                        placeholder="Search"
                        className="flex-1 bg-transparent px-3 outline-none placeholder:text-gray-500"
                    />
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:opacity-80"
                        style={{ backgroundColor: 'var(--button-color)' }}
                    >
                        <div
                            className={`h-6 w-6 rounded-full ${collapsed ? "bg-blue-400" : "bg-gray-300"
                                }`}
                        />
                    </button>

                </div>

                {/* Menu*/}
                <div
                    className={`transition-all duration-500 ${collapsed
                        ? "opacity-0 -translate-y-5 pointer-events-none"
                        : "opacity-100 translate-y-0"
                        }`}
                >
                    {menus.map((item) => (
                        <button
                            key={item.title}
                            onClick={() => navigate(item.route)}
                            className="w-full px-6 py-4 flex items-center hover:bg-[var(--hover-color)] transition gap-2"
                        >
                            <div className="flex items-center gap-10 flex-1">
                                <img src={item.icon} alt={item.title}
                                    className={`object-contain w-6 h-6`} />

                                <span className="flex-1 text-left font-semibold text-[20px]">
                                    {item.title}
                                </span>
                            </div>

                            {item.count && (
                                <span className=" text-gray-400">{item.count}</span>
                            )}

                            <ChevronRight size={20} />
                        </button>
                    ))}
                </div>
            </div>


            <WalletModal
                open={walletOpen}
                onClose={() => setWalletOpen(false)}
                specialityWallet={1234}
                standardWallet={1000}
            />
        </div>
    );
}
