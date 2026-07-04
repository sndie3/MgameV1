interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
    verificationStatus: string;
}

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    username,
    verificationStatus,
}: SidebarProps) {
    return (
        <>
            {/* backdrop */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${sidebarOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* sidebar with details */}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-[#111111] z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]">
                    <div>
                        <h2 className="font-bold uppercase">{username}</h2>
                        <p className="text-sm text-gray-400">
                            {verificationStatus}
                        </p>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-2xl"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </>
    );
}