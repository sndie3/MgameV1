import { ChevronRight } from "lucide-react";
import Button from "../../../components/ui/Button";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
    verificationStatus: string;
}

const menus = [
        {
            title: "How to Use",
        },
        {
            title: "Profile",
        },
        {
            title: "Notifications",
        },
        {
            title: "Privacy",
        },
        {
            title: "Game Responsibly",
        },
        {
            title: "Talk to Us Campaign",
        },
    ];
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
                className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${sidebarOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* sidebar with details */}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-black z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]">

                    <div className="h-12 w-auto rounded-full bg-[#1d1d1d] flex items-center gap-5 p-3">
                        <img src="/assets/icons/setting.png" alt="setting" className="w-10 h-9 rounded-full" />
                        <img src="/assets/icons/ribbon.png" alt="ribbon" className="w-10 h-9 rounded-full" />
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="h-12 w-12 rounded-full bg-[#1d1d1d] flex items-center justify-center">
                        <ChevronRight size={32} />
                    </button>
                </div>

                <div className="flex flex-col px-6 py-4 gap-2">
                    <h2 className="text-lg font-bold uppercase">{username}</h2>
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
                <div>
                    {menus.map((item) => (
                        <button
                            key={item.title}
                            className="w-full px-6 py-4 flex items-center hover:bg-white/10 transition gap-2"
                        >
                            <div className="flex items-center gap-10 flex-1">
                            <span className="flex-1 text-left font-semibold text-[20px]">
                                {item.title}
                            </span>
                            </div>

                

                            <ChevronRight size={20} />
                        </button>
                    ))}
                </div>
                <div className="flex flex-col px-7 py-4 gap-2">
                    <Button variant="secondary">
                        Log Out
                    </Button>
                </div>
            </div>
        </>
    );
}