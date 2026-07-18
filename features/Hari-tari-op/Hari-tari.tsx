import { useEffect, useState } from "react";


function Haritari() {

    const [currentTime, setCurrentTime] = useState(new Date());
    const [roundHistory, setRoundHistory] = useState<any[]>([]);
    const [gameStarted, setGameStarted] = useState(false);

    const initialGameConfig = {
        rounds: 0,
        createdBy: "",
        game: "",
        timer: 30,
        open: "",
        close: "",
        roundNumber: 1,
        hariBet: 0,
        tariBet: 0,
        result: "",
        status: "OPEN",
        month: "",
        day: "",
        year: "",
    };

    const [gameConfig, setGameConfig] = useState(initialGameConfig);
    const [countdown, setCountdown] = useState(gameConfig.timer);


    const isConfigured =
        gameConfig.rounds > 0 &&
        gameConfig.createdBy.trim() !== "" &&
        gameConfig.game.trim() !== "" &&
        gameConfig.timer > 0 &&
        gameConfig.month.length === 2 &&
        gameConfig.day.length === 2 &&
        gameConfig.year.length === 4 &&
        gameConfig.open &&
        gameConfig.close;

    // SINGLE SOURCE OF TRUTH FOR ALL THE ROUNDS HAVE BEEN PLAYED
    const isGameComplete = gameConfig.rounds > 0 && roundHistory.length === gameConfig.rounds;

    const createDisabled = !isConfigured || (gameStarted && !isGameComplete);

    const nextRoundDisabled = !isConfigured || isGameComplete || countdown !== 0 || gameConfig.result === ''

    const nextRound = () => {
        if (!gameStarted) return;

        // SAVE ALWAYS THE LAST ROUND 
        setRoundHistory(prev => [
            {
                date: `${gameConfig.month.padStart(2, "0")}/${gameConfig.day.padStart(2, "0")}/${gameConfig.year}`,
                round: gameConfig.roundNumber,
                game: gameConfig.game,
                createdBy: gameConfig.createdBy,
                timer: gameConfig.timer,
                hariBet: gameConfig.hariBet,
                tariBet: gameConfig.tariBet,
                result: gameConfig.result,
                open: gameConfig.open,
                close: gameConfig.close,
            },
            ...prev,
        ]);

        // IF THE FINAL ROUND IS DONE, THEN THE BUTTON WILL FLIP TO NEW GAME (ENABLE BUTTON)
        if (gameConfig.roundNumber >= gameConfig.rounds) {
            alert("All rounds have been completed.");
            // MARK THE GAME AS ENDED. WITHOUT THIS, THE GAMESTARTED STAY STUCK AT TRUE. 
            // THE EDITING ROUNDS FIELD AFTERWARDS (WHICH CHANGES ISGAMECOMPLETE SINCE ROUNDS NO LONGER MATCHES THE ROUND HISTORY) IT WOULD BUG THE CREATE BUTTON.
            setGameStarted(false);
            setGameConfig(prev => ({
                ...prev,
                status: "CLOSED",
                hariBet: 0,
                tariBet: 0,
                result: "",
            }));
            return;
        }

        // GO TO NEXT ROUND
        setGameConfig(prev => ({
            ...prev,
            roundNumber: prev.roundNumber + 1,
            status: "OPEN",
            hariBet: 0,
            tariBet: 0,
            result: "",
        }));

        setCountdown(gameConfig.timer);
    };

    // CREATE GAME STARTS IN ROUND 1
    const createGame = () => {
        if (!isConfigured) return;

        setGameConfig(prev => ({
            ...prev,
            roundNumber: 1,
            hariBet: 0,
            tariBet: 0,
            result: "",
            status: "READY",
        }));

        setCountdown(gameConfig.timer);
        setRoundHistory([]);
        setGameStarted(false);
    };

    // RESET THE GAME INCLUDING THE HISTORY IN THAT DAY
    const resetGame = () => {
        setGameConfig(initialGameConfig);
        setCountdown(initialGameConfig.timer);
        setRoundHistory([]);
        setGameStarted(false);
    };

    // MONTH RANGED CHECKER
    const updateGameDate = (field: "month" | "day" | "year", value: string) => {
        let numbersOnly = value.replace(/\D/g, "");

        if (field === "month") {
            numbersOnly = numbersOnly.slice(0, 2);

            if (Number(numbersOnly) > 12) {
                numbersOnly = "12";
            }
        }

        if (field === "day") {
            numbersOnly = numbersOnly.slice(0, 2);

            if (Number(numbersOnly) > 31) {
                numbersOnly = "31";
            }
        }

        if (field === "year") {
            numbersOnly = numbersOnly.slice(0, 4);
        }

        setGameConfig((prev) => ({
            ...prev,
            [field]: numbersOnly,
        }));
    };

    // TIME FORMATER FOR HEADER
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedDateTime =
        currentTime.toLocaleDateString("en-US") +
        " " +
        currentTime.toLocaleTimeString("en-US");

    // GAME CONTROLLER IF REACH COUNTDOWN 0 = SET THE STATUS TO CLOSED FOR VALIDATIONS OF ALL BUTTONS
    useEffect(() => {
        if (!gameStarted) return;

        if (gameConfig.status !== "OPEN") return;

        if (countdown <= 0) {
            setGameConfig(prev => ({
                ...prev,
                status: "CLOSED",
            }));
            return;
        }

        const interval = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown, gameConfig.status, gameStarted]);

    // UPDATE GAME CONFIG FIELD CHANGER
    const updateGameConfig = (field: keyof typeof gameConfig, value: any) => {
        setGameConfig((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // GAME STARTER IN ROUND 1
    const startGame = () => {
        if (gameStarted) return;

        setGameStarted(true);

        setGameConfig(prev => ({
            ...prev,
            status: "OPEN",
        }));

        setCountdown(gameConfig.timer);
    };

    // RESULT SETTER AFTER COUNTDOWN
    const setResult = (result: string) => {
        if (!isConfigured || !gameStarted || gameConfig.status !== "CLOSED") return;

        setGameConfig(prev => ({
            ...prev,
            result,
        }));
    };

    return (
        <div className="min-h-dvh bg-gray-100 font-courier">
            {/* HEADER */}
            <div className="bg-black text-white flex justify-between items-center px-4 py-3 font-mono">
                <h1 className="font-bold text-sm">OPERATOR HARI-TARI</h1>
                <span className="text-sm md:text-base">{formattedDateTime}</span>
            </div>

            <div className="p-4 space-y-4">
                {/* TOP SECTION */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-full">
                    {/* LEFT PANEL */}
                    <div className="overflow-x-auto w-full  ">
                        <table className="table-fixed border-collapse bg-white">
                            <tbody>
                                <tr className="bg-white">
                                    <th className="border-y-2 border-gray-400 w-48 h-16 text-center font-bold">
                                        ROUNDS
                                    </th>
                                    <td className="border-y-2 border-gray-400 h-16 px-3">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                value={gameConfig.rounds}
                                                onChange={(e) =>
                                                    updateGameConfig("rounds", Number(e.target.value))
                                                }
                                                className="border rounded px-2 py-1 w-24"
                                            />

                                            <button
                                                onClick={() => {
                                                    if (isGameComplete) {
                                                        resetGame();
                                                    } else {
                                                        createGame();
                                                    }
                                                }}
                                                disabled={createDisabled}
                                                className={`px-5 py-2 rounded-full text-white ${createDisabled
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-600"
                                                    }`}
                                            >
                                                {isGameComplete ? "NEW GAME" : "CREATE"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="bg-gray-200">
                                    <th className=" w-48 h-12  text-center font-bold">
                                        DATE
                                    </th>
                                    <td className=" h-12 px-3">
                                        <div className="grid grid-cols-3 gap-2">
                                            <input
                                                type="text"
                                                placeholder="MM"
                                                value={gameConfig.month}
                                                onChange={(e) => updateGameDate("month", e.target.value)}
                                                className="border rounded text-center h-10"
                                            />
                                            <input
                                                type="text"
                                                placeholder="DD"
                                                value={gameConfig.day}
                                                onChange={(e) => updateGameDate("day", e.target.value)}
                                                className="border rounded text-center h-10"
                                            />
                                            <input
                                                type="text"
                                                placeholder="YYYY"
                                                value={gameConfig.year}
                                                onChange={(e) => updateGameDate("year", e.target.value)}
                                                className="border rounded text-center h-10"
                                            />
                                        </div>
                                    </td>
                                </tr>

                                <tr className="bg-white">
                                    <th className=" w-48 h-12  text-center font-bold">
                                        CREATED BY
                                    </th>
                                    <td className=" h-12 px-3">
                                        <input
                                            value={gameConfig.createdBy}
                                            onChange={(e) => updateGameConfig("createdBy", e.target.value)}
                                            className=" border rounded px-2 py-1 w-full"
                                        />
                                    </td>
                                </tr>

                                <tr className="bg-gray-200">
                                    <th className=" w-48 h-12  text-center font-bold">
                                        GAME
                                    </th>
                                    <td className=" h-12 px-3">
                                        <input
                                            type="text"
                                            value={gameConfig.game}
                                            onChange={(e) =>
                                                updateGameConfig("game", String(e.target.value))
                                            }
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    </td>
                                </tr>

                                <tr className="bg-white">
                                    <th className=" w-48 h-12  text-center font-bold">
                                        TIMER
                                    </th>
                                    <td className=" h-12 px-3">
                                        <input
                                            type="number"
                                            value={gameConfig.timer}
                                            onChange={(e) =>
                                                updateGameConfig("timer", Number(e.target.value))
                                            }
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    </td>
                                </tr>

                                <tr className="bg-gray-200">
                                    <th className=" w-48 h-12 text-center font-bold">
                                        OPEN
                                    </th>
                                    <td className=" h-12 px-3">
                                        <input
                                            type="text"
                                            placeholder="12:00:01 PM"
                                            value={gameConfig.open}
                                            onChange={(e) => updateGameConfig("open", e.target.value.toUpperCase())}
                                            className="border rounded px-3 py-2 w-full text-center"
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th className=" w-48 h-12  text-center font-bold">
                                        CLOSE
                                    </th>
                                    <td className=" h-12 px-3">
                                        <input
                                            type="text"
                                            placeholder="12:00:01 PM"
                                            value={gameConfig.close}
                                            onChange={(e) => updateGameConfig("close", e.target.value.toUpperCase())}
                                            className="border rounded px-3 py-2 w-full text-center"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* CENTER PANEL*/}
                    <div className=" border-green-500 border-2 ">
                        <div className="grid grid-cols-2 border-b border-green-500 bg-white">
                            <div className=" font-bold text-center text-2xl flex border border-green-500 justify-center place-items-center">
                                ROUND NUMBER:
                            </div>
                            <div className="p-4 text-center text-5xl font-bold border border-green-500">
                                {gameConfig.roundNumber}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 border-b border-green-500 bg-emerald-500/10">
                            <div className="p-4 font-bold text-center text-2xl border-r border-green-500">
                                HARI BET:
                            </div>
                            <div className="flex justify-center place-items-center text-3xl ">{gameConfig.hariBet}</div>
                        </div>

                        <div className="grid grid-cols-2 border-b border-green-500 ">
                            <div className="p-4 font-bold text-center text-2xl border-r border-green-500 ">
                                TARI BET:
                            </div>
                            <div className="flex justify-center place-items-center text-3xl ">{gameConfig.tariBet}</div>
                        </div>

                        <div className="grid grid-cols-3 min-h-[140px]">
                            <div className="flex items-center justify-center border-r border-green-500 font-bold text-2xl">
                                RESULT:
                            </div>

                            <div className="grid grid-rows-2">
                                <button
                                    onClick={() => setResult("HARI")}
                                    disabled={!isConfigured || !gameStarted || gameConfig.status !== "CLOSED"}
                                    className={`flex items-center justify-center font-bold text-4xl border-b border-green-500 bg-emerald-500/10
                                        ${gameConfig.result === "HARI" ? "bg-red-600 text-white" : "text-red-600"}
                                    `}
                                >
                                    HARI
                                </button>

                                <button
                                    onClick={() => setResult("DRAW")}
                                    disabled={!isConfigured || !gameStarted || gameConfig.status !== "CLOSED"}
                                    className={`flex items-center justify-center font-bold text-3xl 
                                    ${gameConfig.result === "DRAW" ? "bg-yellow-500 text-white" : "text-yellow-600"}
                                    `}
                                >
                                    DRAW
                                </button>
                            </div>
                            <div className="grid grid-rows-2 border-l border-green-500">
                                <button
                                    onClick={() => setResult("TARI")}
                                    disabled={!isConfigured || !gameStarted || gameConfig.status !== "CLOSED"}
                                    className={`flex items-center justify-center font-bold text-4xl border-b border-green-500 
                                    ${gameConfig.result === "TARI" ? "bg-blue-600 text-black" : "bg-emerald-500/10"}
                                    `}
                                >
                                    TARI
                                </button>

                                <button
                                    onClick={() => setResult("CANCEL")}
                                    disabled={!isConfigured || !gameStarted || gameConfig.status !== "CLOSED"}
                                    className={`flex items-center justify-center font-bold text-3xl
                                    ${gameConfig.result === "CANCEL" ? "bg-purple-700 text-white" : "text-purple-700"}
                                    `}
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL*/}
                    <div className="space-y-4 flex flex-col place-content-center">
                        <div className="flex flex-col md:flex-row gap-4 ">
                            <div
                                onClick={
                                    isConfigured &&
                                        !gameStarted &&
                                        gameConfig.status === "READY"
                                        ? startGame
                                        : undefined
                                }
                                className={`
                                    ${gameConfig.status === "OPEN"
                                        ? "bg-green-500"
                                        : gameConfig.status === "CLOSED"
                                            ? "bg-red-500"
                                            : "bg-gray-500"
                                    }
                                    ${isConfigured &&
                                        !gameStarted &&
                                        gameConfig.roundNumber === 1
                                        ? "cursor-pointer hover:opacity-90"
                                        : "cursor-not-allowed opacity-50"
                                    }
                                text-white flex items-center justify-center rounded-3xl h-50 lg:w-70 text-5xl w-full
                                `}
                            >
                                {gameConfig.status}
                            </div>

                            <div className="border-2 border-blue-900 rounded-full h-48 w-48 mx-auto flex items-center justify-center">
                                <span className="text-red-600 text-7xl">{countdown}</span>
                            </div>
                        </div>

                        <button
                            onClick={nextRound}
                            disabled={nextRoundDisabled}
                            className={`w-full text-3xl py-4 ${nextRoundDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-yellow-700"
                                }`}
                        >
                            NEXT ROUND
                        </button>
                    </div>
                </div>

                {/* ACTION BUTTONS FOR ANIMATIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="bg-red-600 text-white py-4 text-3xl">
                        LAST ROUND
                    </button>

                    <button className="bg-red-600 text-white py-4 text-3xl">
                        CLOSE GAME
                    </button>
                </div>

                {/* OPEN TIME AND CLOSE TIME*/}
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] border bg-white">
                        <div className="grid grid-cols-4 text-center font-bold">
                            <div className="border p-3">OPEN</div>
                            <div className="border p-3">{gameConfig.open}</div>
                            <div className="border p-3">CLOSE</div>
                            <div className="border p-3">{gameConfig.close}</div>
                        </div>
                    </div>
                </div>

                {/* TABLE FOR LOGS */}
                {/* ROUND HISTORY */}
                <div className="bg-white rounded-lg shadow border overflow-hidden">
                    <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
                        <h2 className="text-lg font-bold tracking-wider">
                            ROUND HISTORY
                        </h2>

                        <span className="text-sm text-gray-300">
                            Total Rounds: {roundHistory.length}
                        </span>
                    </div>

                    <div className="overflow-auto max-h-[420px]">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-red-700 text-white">
                                <tr>
                                    {[
                                        "DATE",
                                        "ROUND",
                                        "GAME",
                                        "CREATED BY",
                                        "TIMER",
                                        "PLAYER",
                                        "HARI",
                                        "PLAYER",
                                        "TARI",
                                        "RESULT",
                                        "OPEN",
                                        "CLOSE",
                                    ].map((item) => (
                                        <th
                                            key={item}
                                            className="px-4 py-3 whitespace-nowrap text-center font-bold border"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {roundHistory.map((round, index) => (
                                    <tr
                                        key={index}
                                        className={`border transition hover:bg-yellow-50 gap-5 ${index % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                            }`}
                                    >
                                        <td className="text-center font-bold p-3">
                                            {round.date}
                                        </td>
                                        <td className="text-center">
                                            {round.round}
                                        </td>
                                        <td className="text-center">
                                            {round.game}
                                        </td>
                                        <td className="text-center">
                                            {round.createdBy}
                                        </td>
                                        <td className="text-center">
                                            {round.timer}
                                        </td>
                                        <td className="text-center">
                                        </td>
                                        <td className="text-center font-semibold text-red-600">
                                            {round.hariBet.toLocaleString()}
                                        </td>
                                        <td className="text-center">
                                        </td>
                                        <td className="text-center font-semibold text-blue-600">
                                            {round.tariBet.toLocaleString()}
                                        </td>
                                        <td className="text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-white font-bold
                                ${round.result === "HARI"
                                                        ? "bg-red-600"
                                                        : round.result === "TARI"
                                                            ? "bg-blue-600"
                                                            : round.result === "DRAW"
                                                                ? "bg-yellow-500"
                                                                : "bg-purple-600"
                                                    }`}
                                            >
                                                {round.result}
                                            </span>
                                        </td>

                                        <td className="text-center">
                                            {round.open}
                                        </td>

                                        <td className="text-center">
                                            {round.close}
                                        </td>
                                    </tr>
                                ))}

                                {roundHistory.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={12}
                                            className="py-10 text-center text-gray-500"
                                        >
                                            No rounds played yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Haritari;