import { useState } from "react";
import { ChevronLeft } from "lucide-react";
//import { getUsername, getVerificationStatus } from "../dashboard/services/profileStorage.service";
import { useNavigate } from "react-router-dom";
import CreditModalCashOut from "./components/CreditModalCashout";
function CashIn() {
    // const paymentMethods = ["GCASH", "MAYA", "QR PH"];
    // const amounts = [50, 100, 200, 300, 500, 1000, 2000, 5000, 10000];

    // const [selectedMethod, setSelectedMethod] = useState("GCASH");
    // const [selectedAmount, setSelectedAmount] = useState(0);
    const [showCashOutOption, setShowCashOutOption] = useState(false)

    // const [customAmount, setCustomAmount] = useState(0);

    // const [username] = useState(() => {
    //     return getUsername() || '';
    // });
    // const [verificationStatus] = useState(() => {
    //     const status = getVerificationStatus();
    //     return status ? status.toUpperCase() : '';
    // });

    const navigate = useNavigate();
    const paymentMethods = ["GCASH", "MAYA", "QR PH"];

    const [selectedMethod, setSelectedMethod] = useState("GCASH");
    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">
            <div className="flex-1">
                <div className="px-5 pt-6 pb-6">

                    {/* Header */}
                    <div className="relative flex items-center justify-center mb-2">
                        <button
                            onClick={() => navigate('/dashboard')} className="absolute left-0 w-12 h-12 rounded-full bg-[#111] flex items-center justify-center hover:bg-[#1a1a1a]">
                            <ChevronLeft size={30} />
                        </button>

                        <h1 className=" font-bold text-[24px]">Cash-Out</h1>
                    </div>
                </div>
                <p className="text-gray-500 text-center mb-8">
                    Please check that your mobile number is correct before continuing.
                </p>
                <div className="flex place-content-center mb-5">
                    <img src="/assets/icons/manoy.png" alt="Manoy" className="h-30 object-contain" />
                </div>
                <h2 className="text-center text-[clamp(0.5rem,5vw,1.5rem)] mt-4 font-bold text-white mb-6">
                    CASH OUT
                </h2>
                <h2 className="text-center text-xl font-bold text-white mb-6">
                    SELECT
                </h2>

                {/* Payment Methods */}
                <div className="grid grid-cols-3 gap-3 mb-3 font-bahnschrift text-[clamp(0.5rem,4vw,1.2rem)] ">
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

                <div className="space-y-10 px-10 py-5">
                    <button
                        onClick={() => setShowCashOutOption(true)}
                        className="font-bahnschrift w-full rounded-md py-3 text-lg font-semibold text-white transition bg-red-800 hover:bg-red-700 cursor-pointer flex-col"
                    >
                        <p className="text-2xl">1,234</p>

                        <p>E-CASINO WALLET</p>
                    </button>
                    <button
                        onClick={() => setShowCashOutOption(true)}
                        className="font-bahnschrift w-full rounded-md  py-3 text-lg font-semibold text-white transition bg-red-800 hover:bg-red-700 cursor-pointer flex-col"
                    >
                        <p className="text-2xl">1,234</p>
                        <p>PINOY GAMES WALLET</p>
                    </button>
                </div>
                {/* Deposit
                <div className="flex justify-center py-6">
                    <button
                        onClick={() => setShowCashOutOption(true)}
                        className={`px-24 py-4 font-bold transition bg-red-800 hover:bg-red-700`}>
                        Withdraw
                    </button>
                </div> */}
            </div>
            {/* Footer */}
            <div className="mt-12 flex justify-between text-gray-600 text-md px-5 font-bahnschrift">
                <span className="text-white">CASH-OUT</span>
                <span>All Rights Reserved 2026</span>
                <span>Policies</span>
            </div>

            {/* Custom Amount for Partial only..  */}

            <CreditModalCashOut
                open={showCashOutOption}
                onClose={() => setShowCashOutOption(false)}
            />
        </div>
    );
}

export default CashIn;