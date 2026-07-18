import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const chipBorders: Record<number, string> = {
  20: "border-red-500",
  50: "border-blue-500",
  100: "border-violet-500",
  500: "border-yellow-500",
  1000: "border-green-500",
};

const PARTICLE_COLORS = ["#ef4444", "#3b82f6", "#8b5cf6", "#eab308", "#22c55e", "#f97316"];
const FLIGHT_DURATION = 0.6;
const TRAIL_FRACTIONS = [0.25, 0.45, 0.65, 0.85, 1];

interface Spark {
  id: number;
  tx: number;
  ty: number;
  color: string;
}

interface Burst {
  id: number;
  dx: number;
  dy: number;
  delay: number;
  color: string;
  sparks: Spark[];
}

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


  // --- Win animation state --- //
  // Speciality wallet 
  const [walletBalance, setWalletBalance] = useState(5058200.0);
  const walletRef = useRef<HTMLDivElement>(null);

  const [showWinText, setShowWinText] = useState(false);
  const [fireworks, setFireworks] = useState<Burst[]>([]);

  const launchFireworks = () => {
    const bursts = 15;
    const newFireworks: Burst[] = Array.from({ length: bursts }).map((_, i) => {
      const sparkCount = 50;
      const color = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
      const sparks: Spark[] = Array.from({ length: sparkCount }).map((_, j) => {
        const angle = (360 / sparkCount) * j;
        const rad = (angle * Math.PI) / 180;
        const dist = 80 + Math.random() * 60;
        return {
          id: j,
          tx: Math.cos(rad) * dist,
          ty: Math.sin(rad) * dist,
          color,
        };
      });

      // Target spot anywhere on the page, expressed as travel distance from
      // the center (where "YOU WIN" pop up), in vw/vh units.
      const targetXPercent = 8 + Math.random() * 84; // 8% - 92% of width
      const targetYPercent = 10 + Math.random() * 75; // 10% - 85% of height

      return {
        id: Date.now() + i,
        dx: targetXPercent - 50,
        dy: targetYPercent - 50,
        delay: i * 0.22,
        color,
        sparks,
      };
    });
    setFireworks(newFireworks);
    setTimeout(
      () => setFireworks([]),
      bursts * 220 + FLIGHT_DURATION * 1000 + 900
    );
  };

  const triggerWin = (amount: number) => {

    launchFireworks();
    setShowWinText(true);

    setTimeout(() => {
      setWalletBalance((prev) => prev + amount);
      setShowWinText(false);
    }, 5000);
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
      {/* Fireworks layer pop up the YOU WIN then explodes */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {fireworks.map((fw) => (
          <div
            key={fw.id}
            className="firework-mover"
            style={
              {
                animationDelay: `${fw.delay}s`,
                "--dx": `${fw.dx}vw`,
                "--dy": `${fw.dy}vh`,
              } as React.CSSProperties
            }
          >
            {/* twinkling star trail */}
            {TRAIL_FRACTIONS.map((f, idx) => (
              <span
                key={idx}
                className="firework-trail-star"
                style={
                  {
                    backgroundColor: fw.color,
                    boxShadow: `0 0 6px 2px ${fw.color}`,
                    animationDelay: `${fw.delay + FLIGHT_DURATION * f * 0.9}s`,
                    "--tdx": `${fw.dx * f}vw`,
                    "--tdy": `${fw.dy * f}vh`,
                  } as React.CSSProperties
                }
              />
            ))}

            {/* explosion, timed to fire once the mover arrives */}
            <div
              className="firework-explosion"
              style={{ animationDelay: `${fw.delay + FLIGHT_DURATION}s` }}
            >
              <span
                className="firework-flash"
                style={{
                  backgroundColor: fw.color,
                  boxShadow: `0 0 20px 6px ${fw.color}`,
                  animationDelay: `${fw.delay + FLIGHT_DURATION}s`,
                }}
              />
              {fw.sparks.map((s) => (
                <span
                  key={s.id}
                  className="firework-spark"
                  style={
                    {
                      backgroundColor: s.color,
                      boxShadow: `0 0 6px 2px ${s.color}`,
                      animationDelay: `${fw.delay + FLIGHT_DURATION}s`,
                      "--tx": `${s.tx}px`,
                      "--ty": `${s.ty}px`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      

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

          <div ref={walletRef} className="flex items-center text-lg">
            <img src="/assets/icons/wallet.png" className="h-10" />
            <span>{walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
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
              onClick={() => setSelectedBet(Number(x))}
              className={` relative  w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[10px]  font-black text-black transition-all duration-300 shadow-lg
              ${selectedBet === x
                  ? "scale-110"
                  : "scale-100"
                }
            `}
            >
              <span className={` absolute inset-0 rounded-full border-4 
                  ${selectedBet === x ? `${chipBorders[x]} scale-110 shadow-lg` : "border-gray-700 scale-100"} 
                  bg-gradient-to-br from-white via-gray-200 to-gray-400`} />
              <span
                className=" absolute inset-1 rounded-full border-2 border-dashed border-red-600 " />
              <span className=" absolute w-8 h-8 rounded-full bg-white border-2 border-red-500 flex items-center justify-center z-10 ">
                {x}
              </span>
            </button>
          ))}

          <div className="text-black text-center font-bold">
            <p className="text-xs">Game</p>
            <span className="text-lg">12314</span>
          </div>
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
                    setSelectedSide("HARI");
                  }
                }}
                className="mt-4 w-[85%] bg-red-800 py-3 text-xl font-bold cursor-pointer"
              >
                HARI
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
                  }
                }}
                className="mt-4 w-[85%] bg-gray-600 py-3 text-xl font-bold cursor-pointer"
              >
                TARI
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