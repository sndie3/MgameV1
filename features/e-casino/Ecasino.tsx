import { ArrowLeft, ChevronRight, Search } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Ecasino() {
    const [collapsed, setCollapsed] = useState(false);

    const menus = [
        {
            icon: "/assets/icons/Nav1.png",
            title: "Pinoy Games",
            count: "3",
            route: ""
        },
        {
            icon: "/assets/icons/Nav2.png",
            title: "E-Casino",
            count: "3,247",
            route: ""

        },
        {
            icon: "/assets/icons/Nav3.png",
            title: "E-Bingo",
            count: "12",
            route: ""

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
    const route = useNavigate()
    return (
        <div className="relative min-h-screen overflow-hidden text-white flex flex-col font-bahnschrift">
            <div className="rounded-t-[32px] px-3 pt-6 pb-2 relative z-30" style={{ backgroundColor: 'var(--background-color)' }}>
                <div className="flex items-center mb-5 justify-between">
                    <button
                        onClick={() => { route('/dashboard') }}
                        className="cursor-pointer h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--button-color)' }}
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                    <h1 className="text-[24px] font-semibold ">E-Casino </h1>
                    <div>
                        <img src="/assets/ept.png" alt="icon" className="w-15 h-7 object-contain " />
                    </div>
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
                            onClick={() => route(item.route)}
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

        </div>
    )
}

export default Ecasino