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
import { MENUS, TABS } from "../../constants/dashboard-menu"
import type { MENUIDS } from "../../constants/dashboard-menu"

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

    const { layouts, isLoading, hasMore, loadMore } = useInfiniteGames(gameProvider, 21);
    const navigate = useNavigate();
    const observerTarget = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const clickAudio = useRef<HTMLAudioElement>(null);


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


    const counts: Record<MENUIDS, number> = {
        pinoyGames: 3,
        eCasino: 3247,
        eBingo: 12,
    };

    const addAudio = useRef<HTMLAudioElement>(null);

    const addClick = () => {
        if (addAudio.current) {
            addAudio.current.currentTime = 0;
            addAudio.current.play().catch(() => { });
        }
    };

    const playClick = () => {
        if (clickAudio.current) {
            clickAudio.current.currentTime = 0;
            clickAudio.current.play().catch(() => { });
        }
    };
    return (
        <div className="relative min-h-screen text-white overflow-hidden">
            <audio ref={addAudio} src="/assets/music/menuclick.mp3" preload="auto" />
            <audio ref={clickAudio} src="/assets/music/click.mp3" preload="auto" />

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
                        <button onClick={() => {playClick(); setSidebarOpen(true)}} className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--button-color)' }}>
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
                        <img src="/assets/icons/Wallet2.png" alt="" className="w-14 wallet-pulse" />
                        {/* WALLET */}
                    </span>
                </div>
            </div>

            {/* Header Tab */}
            {/* THIS WILL DISPLAY IF THE USER IS FULLY VERIFIED */}
            <div className="grid grid-cols-4 gap-1 mt-2 px-4 xl:px-5 ">
                {TABS.map((tab) => (
                    <button
                        key={tab.label}
                        className="py-4 text-sm font-semibold hover:opacity-80 bg-[#1d1d1d] hover:bg-[#252525]"
                    >
                        <div className="flex items-center justify-center gap-2">
                            {tab.icon && (
                                <img src={tab.icon} alt={tab.label} className="w-9 h-9 animate-swing object-contain" />
                            )}
                            {tab.label}
                        </div>

                    </button>
                ))}
            </div>
            {/* THIS WILL DISPLAY IF USER IS NOT SEMI VERIFIED */}
            <div className="px-4 xl:px-5 mt-4 space-y-3">
                <button className="w-full rounded-xl bg-[#1d1d1d] py-4 text-center font-semibold hover:bg-[#252525]">
                    Complete Semi Verification and get ₱20.
                </button>
                {/* THIS WILL DISPLAY IF USER IS SEMI VERIFIED BUT NOT FULL VERIFIED */}
                <button className="w-full rounded-xl bg-[#1d1d1d] py-4 text-center font-semibold hover:bg-[#252525]">
                    Complete Full Verification to receive ₱30.
                </button>
            </div>

            {/* Contents / Game Cards Grid */}
            <div ref={scrollContainerRef} className="overflow-y-auto h-[calc(95vh-120px)] px-4 pt-4">
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
        ${collapsed ? "h-14" : "h-[420px]"}`}
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
                    {/* RENDER MENUS */}
                    {MENUS.map((menu) => (
                        <button
                            key={menu.title}
                            onClick={() => {
                                addClick();
                                setTimeout(() => {
                                    navigate(menu.route);
                                }, 300);
                            }}
                            className="w-full px-6 py-3 flex items-center hover:bg-[var(--hover-color)] transition gap-2"
                        >
                            <div className="flex items-center gap-10 flex-1">
                                <img src={menu.icon} alt={menu.title}
                                    className={`object-contain w-9`} />

                                <span className="flex-1 text-left font-semibold text-[20px]">
                                    {menu.title}
                                </span>
                            </div>
                            {/* RENDER COUNT OF PINOY-GAMES, E-CASINO, E-BINGO GAMES */}
                            {menu.id && counts[menu.id] !== undefined && (
                                <span>{counts[menu.id].toLocaleString()}</span>
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
