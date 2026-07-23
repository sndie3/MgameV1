import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const chipImages: Record<number, string> = {
  20: "/assets/chips/20.png",
  50: "/assets/chips/50.png",
  100: "/assets/chips/100.png",
  500: "/assets/chips/500.png",
  1000: "/assets/chips/1K.png",
};

function LiveGame() {

  const roundHistory = [
    { round: 238, bet: 20, win: -20 },
    { round: 237, bet: 20, win: 37 },
    { round: 236, bet: 20, win: -20 },
    { round: 235, bet: 20, win: -20 },
  ];
  const videoId = import.meta.env.VITE_HARI_TARI_LIVE_ID
  const route = useNavigate();
  const [betOpen, setBetOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState<number>(0);
  const [hariBet, setHariBet] = useState(0);
  const [tariBet, setTariBet] = useState(0);
  const [selectedSide, setSelectedSide] = useState<"HARI" | "TARI" | null>(null);
  const [showNextRound, setShowNextRound] = useState(false);
  const [showLastRound, setShowLastRound] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { id: number; text: string }[]
  >([]);
  const [showChat, setShowChat] = useState(false);

  const [messageInput, setMessageInput] = useState("");
  const sendFloatingMessage = (text: string) => {
    const id = Date.now();

    setChatMessages((prev) => [
      ...prev,
      { id, text }
    ]);

    // remove after animation finishes
    setTimeout(() => {
      setChatMessages((prev) =>
        prev.filter((msg) => msg.id !== id)
      );
    }, 4000);
  };
  // --- Coin pop state if click hari bet or tari bet--- //
  const [hariCoinBurst, setHariCoinBurst] = useState(0); // key, incremented to retrigger animation
  const [tariCoinBurst, setTariCoinBurst] = useState(0);
  const [showHariCoins, setShowHariCoins] = useState(false);
  const [showTariCoins, setShowTariCoins] = useState(false);
  const hariCoinTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tariCoinTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const popHariCoins = () => {
    setHariCoinBurst((k) => k + 1);
    setShowHariCoins(true);
    if (hariCoinTimeout.current) clearTimeout(hariCoinTimeout.current);
    hariCoinTimeout.current = setTimeout(() => setShowHariCoins(false), 700);
  };

  const popTariCoins = () => {
    setTariCoinBurst((k) => k + 1);
    setShowTariCoins(true);
    if (tariCoinTimeout.current) clearTimeout(tariCoinTimeout.current);
    tariCoinTimeout.current = setTimeout(() => setShowTariCoins(false), 700);
  };

  // --- Win animation state --- //
  // Speciality wallet 
  const [walletBalance, setWalletBalance] = useState(5058200.0);
  const walletRef = useRef<HTMLDivElement>(null);

  const [showWinText, setShowWinText] = useState(false);
  const [showMoneyRain, setShowMoneyRain] = useState(false);

  const triggerWin = (amount: number) => {
    setShowWinText(true);
    YouWinAudio();

    // First rain
    setShowMoneyRain(true);

    // Stop first rain 
    setTimeout(() => {
      setShowMoneyRain(false);
    }, 3600);

    // Start second rain
    setTimeout(() => {
      setShowMoneyRain(true);
    }, 3700);

    // End all rains
    setTimeout(() => {
      setShowMoneyRain(false);
      setShowWinText(false);
      setWalletBalance(prev => prev + amount);
    }, 9000);
  };
  // Banner shown when a fresh betting round opens up
  const triggerNextRound = () => {
    setShowNextRound(true);
    setTimeout(() => setShowNextRound(false), 1800);
  };

  // Banner shown as a final-call warning when betting is about to close
  const triggerLastRound = () => {
    setShowLastRound(true);
    setTimeout(() => setShowLastRound(false), 1800);
  };

  // Called when betting opens for a new round
  // const handleOpenNextRound = () => {
  //   setBetOpen(true);
  //   setHariBet(0);
  //   setTariBet(0);
  //   setSelectedBet(0);
  //   setSelectedSide(null);
  //   triggerNextRound();
  // };

  // Called when betting is locked for the current round
  // const handleCloseForLastRound = () => {
  //   setBetOpen(false);
  //   triggerLastRound();
  // };
  const chipAudio = useRef<HTMLAudioElement>(null);
  const hariTari = useRef<HTMLAudioElement>(null);
  const youWin = useRef<HTMLAudioElement>(null);

  const playChip = () => {
    if (chipAudio.current) {
      chipAudio.current.currentTime = 0;
      chipAudio.current.play().catch(() => { });
    }
  };

  const HariTariAudio = () => {
    if (hariTari.current) {
      hariTari.current.currentTime = 0;
      hariTari.current.play().catch(() => { });
    }
  }

  const YouWinAudio = () => {
    if (youWin.current) {
      youWin.current.currentTime = 0;
      youWin.current.play().catch(() => { });
    }
  }

  return (
    <div className="bg-black text-white font-sans min-h-screen overflow-hidden relative">
      {/* Win animation overlay */}
      {showWinText && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-none">
          <span className="you-win-label">YOU WIN</span>
        </div>
      )}
      {/* Next round warning banner */}
      {showNextRound && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-none">
          <span className="next-round-label">NEXT ROUND</span>
        </div>
      )}

      {/* Last round warning banner */}
      {showLastRound && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-none">
          <span className="last-round-label">LAST ROUND</span>
        </div>
      )}

      {showMoneyRain && (
        <div className="money-rain-container">
          {Array.from({ length: 35 }).map((_, i) => {
            const isBill = Math.random() > 0.35;

            const style = {
              "--x": `${Math.random() * 100}vw`,
              "--sway": `${(Math.random() - 0.5) * 160}px`,
              "--rot": `${(Math.random() > 0.5 ? 1 : -1) * (300 + Math.random() * 400)}deg`,
              "--duration": `${2 + Math.random() * 1.5}s`,
              "--delay": `${Math.random() * 0.8}s`,
            } as React.CSSProperties;

            return isBill ? (
              <div key={i} className="money-bill" style={style} />
            ) : (
              <img
                key={i}
                src="/assets/peso.png"
                className="money-coin"
                style={style}
              />
            );
          })}
        </div>
      )}
      <audio ref={chipAudio} src="/assets/music/chipsound.mp3" preload="auto" />
      <audio ref={hariTari} src="/assets/music/hari-tari-click.mp3" preload="auto" />
      <audio ref={youWin} src="/assets/music/youwin.mp3" preload="auto" />

      <div className="fixed top-0 left-5  z-[80] flex flex-col h-[35vh] mt-20 justify-end gap-2">
        {/* Floating messages */}
        <div className="flex flex-col gap-1 pointer-events-none ">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className=" text-white  px-2  py-2  rounded-full  text-[10px]  font-bold  animate-float-chat w-32 break-words whitespace-normal"
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      {showChat && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 z-[80] w-[95%] max-w-md">
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendFloatingMessage(messageInput);
                setMessageInput("");
                setShowChat(false);
              }
            }}
            placeholder="Type a message..."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-600  text-white placeholder:text-gray-400 px-4 py-3 text-sm shadow-xl backdrop-blur-lg outline-none focus:border-gray-500"
            autoFocus
          />
        </div>
      )}
      {/* animations test buttons for testing only.. it will be mounted in operator side. */}
      <button
        onClick={() => triggerWin(hariBet > 0 ? hariBet : tariBet)} className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-yellow-500 text-black font-black px-5 py-2 rounded-full shadow-lg cursor-pointer">
        Test Win Animation
      </button>
      <button onClick={triggerNextRound} className="bg-green-500 fixed bottom-4 left-20 -translate-x-1/2 z-50  text-black font-black px-5 py-2 rounded-full shadow-lg cursor-pointer" >
        Next Round
      </button>
      <button onClick={triggerLastRound} className="bg-red-600  fixed bottom-4 right-20 -translate-x-1/2 z-50  text-black font-black px-5 py-2 rounded-full shadow-lg cursor-pointer">
        Last Round
      </button>
      <div className="relative">

        {/* Popup */}
        {showHistory && (
          <div
            className="absolute left-0 mt-2 top-15 w-40 rounded-lg  border border-yellow-500 shadow-2xl z-50"
          >
            <div className="grid grid-cols-3 text-yellow-400 font-bold text-center py-2 border-b border-gray-700 text-xs">
              <span>GAME</span>
              <span>BET</span>
              <span>WIN</span>
            </div>

            <div className="max-h-55 overflow-y-auto text-xs">
              {roundHistory.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 text-center py-2 border-b border-gray-800 text-yellow-300"
                >
                  <span>{item.round}</span>
                  <span>{item.bet}</span>
                  <span
                    className={
                      item.win >= 0
                        ? "text-green-400"
                        : "text-red-500"
                    }
                  >
                    {item.win}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Video Container */}
      <div
        className={`relative w-full transition-all duration-500 ease-in-out ${betOpen ? "h-[55vh] sm:h-[65vh]" : "h-screen"
          }`}
      >
        <iframe
          className="absolute top-1/2 left-1/2 w-screen h-screen -translate-x-1/2 -translate-y-1/2 cursor-default"
          src={`${videoId}?autoplay=1&controls=0&disablekb=1`}
          title="Hari-Tari"
          allow="autoplay; encrypted-media"
        />

        {/* Header Floating */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-start px-4 pt-6 z-10">
          <div className="flex items-center gap-5">
            <button className="cursor-pointer" onClick={() => { route('/pinoy-games') }}>
              <img src="/assets/icons/back.png" className="h-10" />
            </button>

            <button>
              <img src="/assets/Hari-tari.png" className="h-10" />
            </button>
          </div>

          <div ref={walletRef} className="flex items-center text-lg gap-2">
            <img src="/assets/icons/Wallet.png" className="h-10 wallet-pulse" />
            <span>{walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>


        <div className="absolute top-20 w-full flex justify-end items-start px-5 pt-6 z-10">
          <img
            src="/assets/icons/gift.png"
            alt="gift"
            className="w-14 object-contain animate-swing"
          />
        </div>
        <div className="absolute top-40 w-full flex justify-end items-start px-5 pt-6 z-10">
          <button
            onClick={() => setShowChat((prev) => !prev)}          >
            <img
              src="/assets/icons/chat.png"
              alt="chat"
              className="w-14 object-contain cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* Betting */}
      <div
        className={`absolute bottom-0 left-0 w-full flex h-[40vh] transition-all duration-500 ease-in-out transform
        ${betOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
          }
      `}
      >
        {/* Close Button */}
        <button onClick={() => setBetOpen(false)} className="absolute right-0 -top-24 bg-green-500 text-white px-4 py-2 z-20">
          OPEN
        </button>
        {/* Multipliers */}
        <div className="absolute -top-[55px] left-0 w-full h-[55px] bg-white flex justify-around items-center z-10">
          {[20, 50, 100, 500, 1000].map((x) => (
            <button
              key={x}
              onClick={() => { playChip(); setSelectedBet(x) }}
              className={`transition-all duration-300 ${selectedBet === x ? "scale-150 opacity-100" : "scale-100 opacity-80 hover:opacity-100"
                }`}
            >
              <img
                src={chipImages[x]}
                alt={`${x} chip`}
                className={`w-12 h-12 sm:w-14 sm:h-14 object-contain transition-all duration-300 `}
              />
            </button>
          ))}
        </div>

        {/* Hari */}
        <div className="flex flex-col w-full">
          <div className="flex w-full flex-1">
            <div className="w-1/2 bg-red-600 text-center pt-2 place-content-center">
              <div className="text-3xl font-bold">92,00,000</div>
              <div>185.00%</div>
              <h3 className="font-bold mt-2">BET: {hariBet}</h3>
              <p className="text-xs">Payout: 37.00</p>
              <button
                onClick={() => {
                  if (selectedBet > 0) {
                    setHariBet(prev => prev + selectedBet);
                    HariTariAudio()
                    setSelectedSide("HARI");
                    popHariCoins();
                  }
                }}
                className="mt-4 w-[85%] bg-red-800 py-3 text-xl font-bold cursor-pointer relative"
              >
                HARI
                {showHariCoins && (
                  <div key={hariCoinBurst} className="coin-burst">
                    {Array.from({ length: 15 }).map((_, i) => {
                      const style = {
                        "--x": `${(Math.random() - 0.5) * 120}px`,
                        "--rot": `${(Math.random() - 0.5) * 360}deg`,
                        "--delay": `${Math.random() * 0.15}s`,
                      } as React.CSSProperties;
                      return <img key={i} src="/assets/peso.png" className="coin-pop" style={style} />;
                    })}
                  </div>
                )}
              </button>
            </div>

            {/* Tari */}
            <div className="w-1/2 bg-black text-center pt-2 place-content-center">
              <div className="text-3xl font-bold">92,00,000</div>
              <div>185.00%</div>
              <h3 className="font-bold mt-2">BET: {tariBet}</h3>
              <p className="text-xs">Payout: 37.00</p>
              <button
                onClick={() => {
                  if (selectedBet > 0) {
                    setTariBet(prev => prev + selectedBet);
                    setSelectedSide("TARI");
                    popTariCoins();          // ← added
                    HariTariAudio()

                  }
                }}
                className="mt-4 w-[85%] bg-gray-600 py-3 text-xl font-bold cursor-pointer relative"
              >
                TARI
                {showTariCoins && (
                  <div key={tariCoinBurst} className="coin-burst">
                    {Array.from({ length: 15 }).map((_, i) => {
                      const style = {
                        "--x": `${(Math.random() - 0.5) * 120}px`,
                        "--rot": `${(Math.random() - 0.5) * 360}deg`,
                        "--delay": `${Math.random() * 0.15}s`,
                      } as React.CSSProperties;
                      return <img key={i} src="/assets/peso.png" className="coin-pop" style={style} />;
                    })}
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="flex bg-white text-black h-13 items-center">
            <div className="w-1/2 flex items-center justify-center gap-4">
              <span className="font-bold">TREND</span>
              <div className="flex gap-1 text-white font-bold">
                <span className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center text-xl">H</span>
                <span className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-xl">T</span>
              </div>
            </div>
            <span className="border h-full"></span>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-1/2 text-center font-bold">HISTORY</button>
          </div>
        </div>
      </div>

      {/* Reopen button */}
      <div
        className={`absolute bottom-0 bg-white text-black h-15 w-full z-20
          transition-all duration-500 ease-in-out transform
          ${betOpen
            ? "translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
          }
        `}
      >
        <button onClick={() => setBetOpen(true)} className="absolute right-0 -top-10 bg-red-500 text-white px-4 py-2 z-20">
          CLOSED
        </button>
        <div className="flex h-full">
          <div className="w-1/2 flex items-center justify-start gap-4 px-5">
            <div className="flex gap-1 text-white font-bold ">
              {selectedSide && (
                <span
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-bold
                  ${selectedSide === "HARI" ? "bg-red-500" : "bg-black"}`}>
                  {selectedSide === "HARI" ? "H" : "T"}
                </span>
              )}
              <p className="text-black flex place-items-center">
                Bet: <span>{selectedSide === "HARI" ? hariBet : selectedSide === "TARI" ? tariBet : 0}</span>
              </p>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-between gap-4 h-full">
            <div className="flex gap-1 text-white font-bold ">
              <p className="text-black flex place-items-center ">Payout: <span>20</span></p>
            </div>
            <div className="text-black text-center border h-full flex flex-col place-content-center w-full">
              <p className="text-xs">Game</p>
              <span className="text-lg font-black">12314</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveGame;