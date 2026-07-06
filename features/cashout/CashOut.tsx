import{ useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { getUsername, getVerificationStatus } from "../dashboard/services/profileStorage.service";
import { useNavigate } from "react-router-dom";
function CashIn() {
    const paymentMethods = ["GCASH", "MAYA", "QR PH"];
    const amounts = [50, 100, 200, 300, 500, 1000, 2000, 5000, 10000];

    const [selectedMethod, setSelectedMethod] = useState("GCASH");
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [customAmount, setCustomAmount] = useState("");

    const [username, setUsername] = useState('')
    const [verificationStatus, setVerificationStatus] = useState('')

  const navigate = useNavigate();
    useEffect(() => {
        const storedUsername = getUsername();
        const storedVerification = getVerificationStatus();

        if (storedUsername) {
            setUsername(storedUsername);
        }

        if (storedVerification) {
            setVerificationStatus(storedVerification.toUpperCase());
        }
    }, []);

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden ">
            <div className="px-5 pt-6 pb-6">

                {/* Header */}
                <div className="relative flex items-center justify-center mb-2">
                    <button
                    onClick={() => navigate('/dashboard')}  className="absolute left-0 w-12 h-12 rounded-full bg-[#111] flex items-center justify-center hover:bg-[#1a1a1a]">
                        <ChevronLeft size={30} />
                    </button>

                    <h1 className=" font-bold text-[24px]">Cash-Out</h1>
                </div>
            </div>
            <p className="text-gray-500 text-center mb-8">
                Make sure that the number is correct and order.
            </p>

            <div className="flex justify-between items-center px-5 pb-5">
               <div>
                 <h2 className="text-[20px] font-bold">{username}</h2>
                <p className="text-[15px] text-gray-400 mt-1">
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
                <span className="text-2xl font-semibold">₱1,237.00</span>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-3 gap-3 mb-3 px-5 font-bahnschrift text-[clamp(0.5rem,4vw,1.2rem)]">
                {paymentMethods.map((method) => (
                    <button
                        key={method}
                        onClick={() => setSelectedMethod(method)}
                        className={`h-20 font-bold  transition-all
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
            <div className="grid grid-cols-3 gap-3 mb-4 px-5  text-[clamp(0.5rem,4vw,1.5rem)] font-bahnschrift">
                {amounts.map((amount) => (
                    <button
                        key={amount}
                        onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                        }}
                        className="bg-[#111] h-20 font-semibold hover:bg-[#1b1b1b]"
                    >
                        <span
                            className={
                                selectedAmount === amount
                                    ? "text-red-500"
                                    : "text-white"
                            }
                        >
                            {amount}
                        </span>
                    </button>
                ))}
            </div>

            {/* Custom Amount */}
            <div className="px-5 font-bahnschrift">
                <input
                    type="number"
                    placeholder="Any amount"
                    value={customAmount}
                    onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                    }}
                    className="w-full h-20 bg-[#111] text-center text-xl placeholder:text-gray-600 outline-none mb-10 italic"
                />
            </div>

            {/* Deposit */}
            <div className="flex justify-center">
                <button className="bg-red-800 hover:bg-red-700 transition px-24 py-5  font-bold">
                    Withdraw
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
            </div>

            <div className="flex justify-center mt-6">
                <img
                    src="/assets/icons/maya.png"
                    alt="Maya"
                    className="h-6 object-contain"
                />
            </div> */}

            {/* Footer */}
            <div className="mt-12 flex justify-between text-gray-600 text-md px-5 font-bahnschrift">
                <span className="text-white">CASH-OUT</span>
                <span>All Rights Reserved 2026</span>
                <span>Policies</span>
            </div>
        </div>
    );
}

export default CashIn;