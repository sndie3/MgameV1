import {
    Menu,
    Search,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);

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

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* Header */}
            <div className="px-5 pt-4">
                <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                        <button className="h-14 w-14 rounded-full bg-[#1d1d1d] flex items-center justify-center">
                            <Menu size={28} />
                        </button>

                        <div>
                            <h2 className="font-semibold uppercase tracking-wide">
                                Roger Nicon
                            </h2>
                            <p className="text-sm text-gray-400">Fully Verified</p>
                        </div>
                    </div>

                    <span className="text-2xl font-semibold">₱1,237.00</span>
                </div>
            </div>

            {/* Header Tab */}
            <div className="grid grid-cols-4 gap-1 mt-4 px-2">
                {["Recently", "Invite", "Rewards", "EPT"].map((tab) => (
                    <button
                        key={tab}
                        className="bg-[#171717] py-4 text-sm font-semibold hover:bg-[#252525]"
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Contents / Grid Data*/}
            <div className="overflow-y-auto h-[calc(100vh-120px)] px-5 pt-4 pb-[80px]">
                {Array.from({ length: 40 }).map((_, index) => (
                    <p key={index} className="text-gray-400 py-2">
                        Test Content {index + 1}
                    </p>
                ))}
            </div>

            {/* Bottom Navbar*/}
            <div
                className={` fixed bottom-0 left-0 right-0 z-50
        rounded-t-3xl
        bg-[#1d1d1d]/20
        backdrop-blur-sm
        transition-all duration-500
        ${collapsed ? "h-14" : "h-[400px]"}`}
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

                            <span className="flex-1 text-left font-semibold text-sm">
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