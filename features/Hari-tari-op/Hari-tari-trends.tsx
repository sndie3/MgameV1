import { useEffect, useState } from "react";



const trends = [
    ["HARI", "TARI", "HARI", "CANCEL", "DRAW", "TARI", "", "", "", ""],
];

const getTextColor = (value: string) => {
    switch (value) {
        case "HARI":
            return "text-red-600";
        case "TARI":
            return "text-black";
        case "DRAW":
            return "text-yellow-600";
        case "CANCEL":
            return "text-purple-700";
        default:
            return "";
    }
};


function Haritaritrends() {
    const [currentTime, setCurrentTime] = useState(new Date());

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
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-black text-white flex justify-between items-center px-4 py-3 font-mono font-bold">
                <span>LIVE TRENDS HARI-TARI</span>
                <span>{formattedDateTime}</span>
            </div>

            <div className="p-8 space-y-5 ">
                {/* Summary */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 border border-green-500 ">
                    {[
                        "TOTAL BET HARI",
                        "TOTAL BET TARI",
                        "PAYOUT",
                        "RAKE",
                    ].map((title) => (
                        <div
                            key={title}
                            className="border-r last:border-r-0 border-green-500"
                        >
                            <div className="border-b border-green-500 text-center font-bold text-lg py-3">
                                {title}
                            </div>
                            <div className="bg-green-50 text-center text-2xl font-bold py-5">
                                0
                            </div>
                        </div>
                    ))}
                </div>

                {/* Current Round */}
                <div className="grid md:grid-cols-2 xl:grid-cols-6 border border-green-500 ">
                    {[
                        "ROUND",
                        "PLAYER",
                        "HARI BET",
                        "PLAYER",
                        "TARI BET",
                        "RESULT",
                    ].map((title) => (
                        <div
                            key={title}
                            className="border-r last:border-r-0 border-green-500"
                        >
                            <div className="border-b border-green-500 text-center font-bold text-lg py-3">
                                {title}
                            </div>
                            <div className="bg-green-50 text-center text-2xl font-bold py-5">
                                0
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trends */}
                <div className="w-full">
                    <h1 className="text-2xl md:text-3xl font-black text-center mb-6">
                        TRENDS
                    </h1>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[600px] border-collapse table-fixed border border-green-500">
                            <tbody>
                                {trends.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className={rowIndex % 2 === 1 ? "bg-green-50" : ""}
                                    >
                                        {row.map((cell, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className={`
                                    border border-green-500
                                    h-8 md:h-10
                                    text-center
                                    text-sm md:text-lg
                                    font-bold
                                    whitespace-nowrap
                                    ${rowIndex % 2 === 1 ? "bg-green-50" : ""}
                                `}
                                            >
                                                <span className={getTextColor(cell)}>
                                                    {cell}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Haritaritrends;