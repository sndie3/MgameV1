import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreditModalCashIn from "./components/CreditModalCashIn";

function CashIn() {
    const paymentMethods = ["GCASH", "MAYA", "QR PH"];
    const amounts = [50, 100, 200, 300, 500, 1000, 2000, 5000, 10000];

    const [selectedMethod, setSelectedMethod] = useState("GCASH");
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [customAmount, setCustomAmount] = useState(0);
    const [showCashInOption, setShowCashInOption] = useState(false)
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">
            <div className="flex-1">
                <div className="px-5 pt-6 pb-6">
                    {/* Header */}
                    <div className="relative flex items-center justify-center mb-2">
                        <button onClick={() => navigate('/dashboard')} className="absolute left-0 w-12 h-12 rounded-full bg-[#111] flex items-center justify-center hover:bg-[#1a1a1a]">
                            <ChevronLeft size={30} />
                        </button>

                        <h1 className=" font-bold text-[24px]">Cash-In</h1>
                    </div>
                </div>
                <p className="text-gray-500 text-center mb-8">
                    Please check that your mobile number is correct before continuing.
                </p>

                {/* Payment Methods */}
                <div className="grid grid-cols-3 gap-3 mb-3 px-5 font-bahnschrift text-[clamp(0.5rem,5vw,1.2rem)]">
                    {paymentMethods.map((method) => (
                        <button
                            key={method}
                            onClick={() => setSelectedMethod(method)}
                            className={`h-20 font-bold  transition-all cursor-pointer
                            ${selectedMethod === method
                                    ? "bg-red-800"
                                    : "bg-[#111] hover:bg-[#191919]"
                                }`}
                        >
                            {method}
                        </button>
                    ))}
                </div>

                {/* Amounts */}
                <div className="grid grid-cols-3 gap-3 mb-4 px-5  text-[clamp(0.5rem,6vw,1.5rem)] font-bahnschrift">
                    {amounts.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => {
                                setSelectedAmount(amount);
                                setCustomAmount(0);
                                setShowCashInOption(true)
                            }}
                            className="bg-[#111] h-20 font-semibold hover:bg-[#1b1b1b] cursor-pointer"
                        >
                            <span
                                className={
                                    selectedAmount === amount
                                        ? "text-red-500"
                                        : "text-white"
                                }
                            >
                                {amount.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Custom Amount */}
                <div className="px-5 font-bahnschrift">
                    <input
                        type="tel"
                        placeholder="Input desired amount"
                        value={customAmount === 0 ? "" : customAmount}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ""); 
                            setCustomAmount(value === "" ? 0 : Number(value));
                            setSelectedAmount(0);
                        }}
                        className="w-full h-15 bg-[#111] text-center text-2xl placeholder:text-gray-600 outline-none mb-10 italic"
                    />
                </div>

                {/* Deposit */}
                <div className="flex justify-center">
                    <button
                        disabled={customAmount <= 0}
                        onClick={() => setShowCashInOption(true)}
                        className={`px-24 py-4 font-bold transition ${customAmount
                            ? "bg-red-800 hover:bg-red-700 cursor-pointer"
                            : "bg-gray-600 cursor-not-allowed opacity-50"
                            }`}
                    >
                        Deposit
                    </button>
                </div>

                {/* Logos */}
                {/* <div className="mt-12 flex justify-evenly items-center gap-10">
                    <img
                        src="/assets/icons/gcash.png"
                        alt="GCash"
                        className="h-6 object-contain"
                    />

                    <img
                        src="/assets/icons/allbank.png"
                        alt="AllBank"
                        className="h-6 object-contain"
                    />
                </div> */}

                {/* <div className="flex justify-center mt-6">
                    <img
                        src="/assets/icons/maya.png"
                        alt="Maya"
                        className="h-6 object-contain"
                    />
                </div> */}

            </div>


            {/* Footer */}
            <div className="mt-12 flex justify-between text-gray-600 text-md px-5 font-bahnschrift">
                <span className="text-white">CASH-IN</span>
                <span>All Rights Reserved 2026</span>
                <span>Policies</span>
            </div>

            <CreditModalCashIn
                open={showCashInOption}
                onClose={() => setShowCashInOption(false)}
                amount={Number(customAmount || selectedAmount)}
                onSelect={(option) => {
                    if (option === "e-casino") {
                        // Navigate or perform action
                    }

                    if (option === "pinoy-games") {
                        // Navigate or perform action
                    }
                }}
            />
        </div>
    );
}

export default CashIn;