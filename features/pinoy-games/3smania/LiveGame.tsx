import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";


type TopOption = {
    label: string;
    color: string;
    bet: number;
    img: string;

};

const betAmounts = [
    { value: 5, img: "/assets/chips/5.png" },
    { value: 10, img: "/assets/chips/10.png" },
    { value: 20, img: "/assets/chips/20.png" },
    { value: 50, img: "/assets/chips/50.png" },
    { value: 100, img: "/assets/chips/100.png" },
    { value: 500, img: "/assets/chips/500.png" },
];

const gridItems = [
    { label: "A", sub: "ACE" },
    { label: "2", sub: "TWO" },
    { label: "3", sub: "THREE" },
    { label: "4", sub: "FOUR" },
    { label: "5", sub: "FIVE" },
    { label: "6", sub: "SIX" },
    { label: "7", sub: "SEVEN" },
    { label: "8", sub: "EIGHT" },
    { label: "BETS", sub: "" },
    { label: "9", sub: "NINE" },
    { label: "10", sub: "TEN" },
    { label: "ADD", sub: "" },
];

export default function ThreeSMania() {
    const [activeTab, setActiveTab] = useState<"combo" | "game">("game");
    const [selectedBet, setSelectedBet] = useState(20);
    const [selectedGrid, setSelectedGrid] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [topOptions, setTopOptions] = useState<TopOption[]>([]);
    const navigate = useNavigate()

    const addOption = () => {
        if (!selectedGrid) return;

        const selectedChip = betAmounts.find(
            (chip) => chip.value === selectedBet
        );

        if (!selectedChip) return;

        setTopOptions((prev) => {
            if (prev.length >= 5) {
                return prev;
            }

            return [
                ...prev,
                {
                    label: selectedGrid,
                    color: "#808080",
                    bet: selectedBet,
                    img: selectedChip.img,
                },
            ];
        });

        addClick();
    };
    useEffect(() => {
        const unmute = () => {
            const v = videoRef.current;
            if (!v) return;
            v.muted = false;
            v.volume = 1;
            v.play().catch(() => {
                v.muted = true;
                v.play().catch(() => { });
            });
        };
        window.addEventListener("click", unmute, { once: true });
        window.addEventListener("touchstart", unmute, { once: true });
        window.addEventListener("keydown", unmute, { once: true });
        return () => {
            window.removeEventListener("click", unmute);
            window.removeEventListener("touchstart", unmute);
            window.removeEventListener("keydown", unmute);
        };
    }, []);

    const clickAudio = useRef<HTMLAudioElement>(null);
    const chipAudio = useRef<HTMLAudioElement>(null);
    const addAudio = useRef<HTMLAudioElement>(null);
    const betAudio = useRef<HTMLAudioElement>(null);

    const playClick = () => {
        if (clickAudio.current) {
            clickAudio.current.currentTime = 0;
            clickAudio.current.play().catch(() => { });
        }
    };

    const playChip = () => {
        if (chipAudio.current) {
            chipAudio.current.currentTime = 0;
            chipAudio.current.play().catch(() => { });
        }
    };

    const addClick = () => {
        if (addAudio.current) {
            addAudio.current.currentTime = 0;
            addAudio.current.play().catch(() => { });
        }
    };

    const betClick = () => {
        if (betAudio.current) {
            betAudio.current.currentTime = 0;
            betAudio.current.play().catch(() => { });
        }
    };


    const toggleGridItem = (label: string) => {
        playClick();
        setSelectedGrid((prev) => (prev === label ? null : label));
    };

    return (
        <div className="min-h-dvh w-full bg-black text-white flex flex-col relative overflow-hidden">
            {/* Video background */}
            {/* <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      /> */}
            <div className="pointer-events-none absolute inset-0 bg-black/50" />
            <audio ref={clickAudio} src="/assets/music/click.mp3" preload="auto" />
            <audio ref={chipAudio} src="/assets/music/chipsound.mp3" preload="auto" />
            <audio ref={addAudio} src="/assets/music/add.mp3" preload="auto" />
            <audio ref={betAudio} src="/assets/music/bet.mp3" preload="auto" />

            {/* Top nav */}
            <div className="flex items-center justify-between px-3 pt-3 pb-2 relative z-10">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/pinoy-games')} className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                        <img src="/assets/icons/back.png" className="h-10" />
                    </button>

                    <img src="/assets/3Smania.png" alt="3s Mania" className="h-10 w-auto object-contain" />
                </div>

                <div className="flex items-center text-lg gap-2">
                    <img src="/assets/icons/Wallet.png" alt="Wallet" className="h-10 wallet-pulse" />
                    <span className="text-sm font-black text-white">1,098,000</span>
                </div>
            </div>

            {/* Header options + go regular */}
            <div className="flex flex-col items-center justify-between px-4 py-2 relative z-10">
                <div className="flex items-center gap-5">
                    {topOptions.map((opt, index) => (
                        <div key={index} className="relative">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black border border-white/30 shadow-lg"
                                style={{ backgroundColor: opt.color }}
                            >
                                {opt.label}
                            </div>

                            <div className="absolute -bottom-3 -right-3 w-8 h-8 flex items-center justify-center">
                                <img
                                    src={opt.img}
                                    alt={`${opt.bet}`}
                                    className="w-8 h-8 object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end w-full mt-8">
                    <button className="w-14 h-14 rounded-full bg-[#c8102e] text-[10px] font-black leading-tight border-2 border-[#ff4d6d] shadow-lg active:scale-95 transition-transform justify-end">
                        GO TO<br />REGULAR
                    </button>
                </div>
            </div>

            {/* White content card */}
            <div
                className={`absolute inset-x-0 bottom-0 w-full max-h-[72vh] bg-[#f8f8f8] rounded-t-3xl text-black z-10 flex flex-col overflow-hidden shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-4rem)]"
                    }`}
            >
                {/* Tabs */}
                <div className="relative h-16 flex items-center justify-center px-4">
                    <button
                        onClick={() => setActiveTab("combo")}
                        className={`flex-1 h-full text-xs font-black tracking-wide ${activeTab === "combo" ? "text-black" : "text-gray-500"
                            }`}
                    >
                        COMBO
                    </button>

                    <div className="relative flex-1 h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#d1d1d1] clip-tab" />
                        <button
                            onClick={() => setActiveTab("game")}
                            className="relative z-10 flex flex-col items-center justify-center h-full pt-2"
                        >
                            <span className="text-[10px] text-gray-600 font-bold leading-none">GAME</span>
                            <span className="text-xl font-black leading-none">05</span>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex-1 h-full text-xs font-black tracking-wide ${isOpen ? "text-red-600" : "text-green-600"
                            }`}
                    >
                        {isOpen ? "CLOSED" : "OPEN"}
                    </button>
                </div>

                {isOpen ? (
                    <>
                        {/* Bet chips */}
                        <div className="flex items-center justify-center gap-2 px-4 py-3 flex-wrap">
                            {betAmounts.map((chip) => (
                                <button
                                    key={chip.value}
                                    onClick={() => {
                                        playChip();
                                        setSelectedBet(chip.value);
                                    }}
                                    className={`active:scale-110 transition-transform duration-200 ease-in rounded-full ${selectedBet === chip.value ? "ring-4 ring-yellow-400 scale-150" : ""
                                        }`}
                                >
                                    <img src={chip.img} alt={`${chip.value}`} className="w-12 h-12 object-contain" />
                                </button>
                            ))}
                        </div>

                        {/* Number grid */}
                        <div className="flex-1 px-2 py-2 overflow-y-auto place-items-center ">
                            <div className="grid grid-cols-4">
                                {gridItems.map((item) => {
                                    const isSelected = selectedGrid === item.label;
                                    const isAdd = item.label === "ADD";
                                    const isBets = item.label === "BETS";

                                    return (
                                        <button
                                            key={item.label}
                                            onClick={() => {
                                                if (isAdd) {
                                                    addClick()
                                                    addOption()
                                                } else if (isBets) {
                                                    betClick()
                                                } else {
                                                    toggleGridItem(item.label);
                                                }
                                            }}
                                            className={`m-1 xl:w-25 xl:h-25 w-20 h-20 aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition-transform active:scale-95 ${isAdd || isBets
                                                ? "text-black"
                                                : isSelected
                                                    ? "bg-yellow-400 text-black border-yellow-500"
                                                    : "border-gray-200 text-black"
                                                }`}
                                        >
                                            <span className={`${(isAdd || isBets) ? "text-[20px] font-semibold" : "text-[28px] font-black"}`}>{item.label}</span>
                                            {item.sub && (
                                                <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                                                    {item.sub}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom buttons */}
                        <div className="flex items-center justify-center gap-8 px-6 py-4 bg-white border-t border-gray-200">
                            <button className="text-lg font-black tracking-wide text-black active:scale-95 transition-transform">
                                RESULT
                            </button>
                            <button className="text-lg font-black tracking-wide text-black active:scale-95 transition-transform">
                                HISTORY
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-gray-400">
                        <span className="text-2xl font-black">Betting Closed</span>
                        <span className="text-xs">Press OPEN to resume</span>
                    </div>
                )}
            </div>

            <style>{`
        .clip-tab {
          clip-path: polygon(0 0, 100% 0, 50% 100%);
        }
      `}</style>
        </div>
    );
}
