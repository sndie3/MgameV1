import { ArrowLeft, SendHorizonal } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

function Support() {
    const route = useNavigate()
    const [activeTab, setActiveTab] = useState("support");

    const tabs = [
        { id: "support", label: "SUPPORT" },
        { id: "contacts", label: "CONTACTS" },
        { id: "chat", label: "CHAT" },
    ];
    const [message, setMessage] = useState("");

    return (
        <div className="min-h-screen text-white flex flex-col font-bahnschrift">
            <div className="rounded-t-[32px] px-3 pt-6 pb-2 relative z-10" style={{ backgroundColor: 'var(--background-color)' }}>
                <div className="flex items-center mb-5 justify-between">
                    <button
                        onClick={() => { route('/dashboard') }}
                        className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--button-color)' }}
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                    <h1 className="text-[24px] font-semibold ">Support</h1>
                    <div>
                        <img src="/assets/icons/invite.png" alt="icon" className="w-7 h-7" />
                    </div>
                </div>
            </div>
            <div className="w-full bg-red-800 py-3 flex justify-center">
                <p className="font-bold text-lg">GAME</p>
            </div>
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
            {/* loop for displays */}
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

                <button
                    className="px-5 py-3 font-semibold"
                >
                    <SendHorizonal/>
                </button>
            </div>
        </div>
    )
}

export default Support  