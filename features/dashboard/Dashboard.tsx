import {
    Search,
    ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import GameCard from "../dashboard/components/GameCard"

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<string>("Fully Verified");
    const [username, setUsername] = useState<string>("Roger Nicon");

    useEffect(() => {
    const status = localStorage.getItem('verificationStatus');
    if (status) {
        setVerificationStatus(status.toUpperCase());
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        setUsername(storedUsername);
    }
}, []);

    const menus = [
        {
            icon: "/assets/icons/Nav1.png",
            title: "Pinoy Games",
            count: "3",
        },
        {
            icon: "/assets/icons/Nav2.png",
            title: "E-Casino",
            count: "3,247",
        },
        {
            icon: "/assets/icons/Nav3.png",
            title: "E-Bingo",
            count: "12",
        },
        {
            icon: "/assets/icons/Nav4.png",
            title: "Cash-In",
        },
        {
            icon: "/assets/icons/Nav5.png",
            title: "Cash-Out",
        },
        {
            icon: "/assets/icons/Nav6.png",
            title: "Support",
        },
    ];

    const tabs = [
  { label: "Recently" },
  { label: "Invite", icon: "/assets/icons/invite.png" },
  { label: "Rewards" },
  { label: "EPT" },
];
    const games = [
        { id: 1, title: "Game 1", image: "", size: "big" },
        { id: 2, title: "Game 2", image: "", size: "small" },
        { id: 3, title: "Game 3", image: "", size: "small" },
        { id: 4, title: "Game 4", image: "", size: "small" },
        { id: 5, title: "Game 5", image: "", size: "big" },
        { id: 6, title: "Game 6", image: "", size: "small" },
        { id: 7, title: "Game 7", image: "", size: "small" },
        { id: 8, title: "Game 8", image: "", size: "small" },
        { id: 9, title: "Game 9", image: "", size: "small" },
    ];

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* Header */}
            <div className="px-5 pt-4">
                <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                        <button className="h-10 w-10 rounded-full bg-[#1d1d1d] flex items-center justify-center">
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

                    <span className="text-2xl font-semibold">₱1,237.00</span>
                </div>
            </div>

            {/* Header Tab */}
            <div className="grid grid-cols-4 gap-1 mt-4 px-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className="bg-[#171717] py-4 text-sm font-semibold hover:bg-[#252525]"
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

            {/* Contents / Game Cards Grid */}
            <div className="overflow-y-auto h-[calc(100vh-120px)] px-5 pt-4 pb-[80px]">
                <div className="space-y-4">
                    {/* Pattern 1: 1 big left, 2 small right */}
                    <div className="grid grid-cols-2 gap-3">
                        <GameCard
                            key={games[0].id}
                            imageSrc={games[0].image}
                            title={games[0].title}
                            size="big"
                        />
                        <div className="grid grid-rows-2 gap-3">
                            <GameCard
                                key={games[1].id}
                                imageSrc={games[1].image}
                                title={games[1].title}
                                size="small"
                            />
                            <GameCard
                                key={games[2].id}
                                imageSrc={games[2].image}
                                title={games[2].title}
                                size="small"
                            />
                        </div>
                    </div>

                    {/* Pattern 2: 2 small left, 1 big right */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid grid-rows-2 gap-3">
                            <GameCard
                                key={games[3].id}
                                imageSrc={games[3].image}
                                title={games[3].title}
                                size="small"
                            />
                            <GameCard
                                key={games[4].id}
                                imageSrc={games[4].image}
                                title={games[4].title}
                                size="small"
                            />
                        </div>
                        <GameCard
                            key={games[5].id}
                            imageSrc={games[5].image}
                            title={games[5].title}
                            size="big"
                        />
                    </div>

                    {/* Pattern 3: 3 small cards horizontal */}
                    <div className="grid grid-cols-3 gap-3">
                        <GameCard
                            key={games[6].id}
                            imageSrc={games[6].image}
                            title={games[6].title}
                            size="small"
                        />
                        <GameCard
                            key={games[7].id}
                            imageSrc={games[7].image}
                            title={games[7].title}
                            size="small"
                        />
                        <GameCard
                            key={games[8].id}
                            imageSrc={games[8].image}
                            title={games[8].title}
                            size="small"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Navbar*/}
            <div
                className={` fixed bottom-0 left-0 right-0 z-50
        rounded-t-3xl
        bg-[#1d1d1d]/20
        backdrop-blur-sm
        transition-all duration-500
        ${collapsed ? "h-14" : "h-[430px]"}`}
            >
                {/* Search */}
                <div className="border-b border-[#2a2a2a] flex items-center px-4 h-14">
                    <Search size={18} className="text-gray-500" />

                    <input
                        placeholder="Search"
                        className="flex-1 bg-transparent px-3 outline-none placeholder:text-gray-500"
                    />

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`w-7 h-7 rounded-full transition-colors ${collapsed ? "bg-blue-400" : "bg-gray-300"
                            }`}
                    />
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
                            className="w-full px-6 py-4 flex items-center hover:bg-white/10 transition gap-2"
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
        </div>
    );
}