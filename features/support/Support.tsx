import { ArrowLeft, SendHorizonal } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import GameCard from "./components/GameCard";

function Support() {
    const games = [
        { imageSrc: "/assets/Hari-tari.png", title: "Hari Tari" },
        { imageSrc: "/assets/regnum.png", title: "Slots" },
        { imageSrc: "/assets/Hari-tari.png", title: "Baccarat" },
        { imageSrc: "/assets/regnum.png", title: "Poker" },
        { imageSrc: "/assets/Hari-tari.png", title: "Hari Tari" },
        { imageSrc: "/assets/regnum.png", title: "Slots" },
        { imageSrc: "/assets/Hari-tari.png", title: "Baccarat" },
        { imageSrc: "/assets/regnum.png", title: "Poker" },
    ];

    const route = useNavigate()
    const [activeTab, setActiveTab] = useState("support");
    const [selectedGame, setSelectedGame] = useState<{
        imageSrc: string;
        title: string;
    } | null>(null);
    const tabs = [
        { id: "support", label: "SUPPORT" },
        { id: "contacts", label: "CONTACTS" },
        { id: "chat", label: "CHAT" },
    ];
    const [message, setMessage] = useState("");
    const [showGame, setShowGame] = useState(false);
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
                    <h1 className="text-[24px] font-semibold ">Support</h1>
                    <div>
                        <img src="/assets/icons/invite.png" alt="icon" className="w-7 h-7" />
                    </div>
                </div>
            </div>
            <button
                disabled={!selectedGame}
                onClick={() => setShowGame(!showGame)}
                className={`
        w-full py-3 flex justify-center relative z-30
        ${selectedGame
                        ? showGame
                            ? "bg-white text-black cursor-pointer"
                            : "bg-red-500 text-white cursor-pointer"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }
    `}
            >
                <p className="font-bold text-lg">GAME</p>
            </button>
            <div
                className={`
                absolute inset-0 pt-[160px]
                flex flex-col
                transition-transform duration-700 ease-in-out
                bg-black z-20
                ${showGame ? "translate-y-full" : "translate-y-0"}
            `}
            >
                <div className="grid grid-cols-3 gap-3 mt-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm font-semibold transition ${activeTab === tab.id
                                ? "bg-white text-black"
                                : "hover:opacity-80"
                                }`}
                            style={{
                                backgroundColor:
                                    activeTab === tab.id
                                        ? undefined
                                        : "var(--button-color)",
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 mt-3 overflow-y-auto">
                    {activeTab === "support" && (
                        <div className="space-y-2">
                            {/* looping for this part for displaying support */}
                            <div
                                className="w-full py-3 px-3 flex justify-between items-center"
                                style={{ backgroundColor: "var(--button-color)" }}
                            >
                                <p className="text-sm text-red-500">
                                    UID: <span className="text-white">Support 1</span>
                                </p>
                                <button>[ CALL ]</button>
                            </div>

                            <div
                                className="w-full py-3 px-3 flex justify-between items-center"
                                style={{ backgroundColor: "var(--button-color)" }}
                            >
                                <p className="text-sm text-red-500">
                                    UID: <span className="text-white">Support 2</span>
                                </p>
                                <button>[ CALL ]</button>
                            </div>
                        </div>
                    )}

                    {activeTab === "contacts" && (
                        <div className="space-y-2">
                            {/* looping for this part for displaying contacts */}
                            <div
                                className="w-full py-3 px-3"
                                style={{ backgroundColor: "var(--button-color)" }}
                            >
                                GCash: 09123456789
                            </div>

                        </div>
                    )}

                    {activeTab === "chat" && (
                        <div
                            className="w-full py-6 text-center"
                            style={{ backgroundColor: "var(--button-color)" }}
                        >
                            {/* looping for this part for displaying for chat */}
                            <button className="bg-red-800 px-6 py-3 rounded font-bold">
                                Start Live Chat
                            </button>
                        </div>
                    )}
                </div>
                {/* carousel auto run */}
                <div className="overflow-hidden w-full">
                    <div className="flex w-max animate-marquee">
                        {[...games, ...games, ...games].map((game, index) => (
                            <div
                                key={index}
                                className="mr-3 shrink-0"
                                onClick={() => {
                                    setSelectedGame(game);
                                    setShowGame(true);
                                }}
                            >
                                <GameCard
                                    imageSrc={game.imageSrc}
                                    title={game.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="flex items-center gap-2 p-3 border-t border-[#333]"
                    style={{ backgroundColor: "var(--button-color)" }}
                >
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 bg-[#111] rounded-full px-4 py-3 outline-none"
                    />
                    <button className="px-5 py-3">
                        <SendHorizonal />
                    </button>
                </div>
            </div>
            {/* mao ning loopan paras duwa die, lamat sa tanan */}
            <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
                {selectedGame && (
                    <img
                        src={selectedGame.imageSrc}
                        alt={selectedGame.title}
                        className="w-125"
                    />
                )}
            </div>
        </div>
    )
}

export default Support  