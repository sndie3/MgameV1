import { useState } from "react";

interface CreditModalProps {
    open: boolean;
    onClose: () => void;
}

function CreditModalCashOut({
    open,
    onClose,

}: CreditModalProps) {
    if (!open) return null;
    const [customAmount, setCustomAmount] = useState(0);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black px-4 "
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg rounded-lg bg-black px-2 font-bahnschrift"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex place-content-center">
                    <img src="/assets/icons/manoy.png" alt="Manoy" className="h-20 object-contain" />
                </div>
                <h2 className="text-center text-[clamp(0.5rem,5vw,1.5rem)] mt-4 font-bold text-white mb-6">
                    CASH OUT
                </h2>
                <h2 className="text-center text-xl font-bold text-white mb-6">
                    SELECT
                </h2>


                <div className="px-5 font-bahnschrift w-full">
                    <div className="flex justify-center py-4">
                        <label htmlFor="any-amount" className="text-xl">Input Amount</label>
                    </div>
                    <input
                        type="number"
                        placeholder="Any amount"
                        value={customAmount === 0 ? "" : customAmount}
                        onChange={(e) => {
                            setCustomAmount(Number(e.target.value));
                            //setSelectedAmount(0);
                        }}
                        className="w-full h-15 bg-[#111] text-center text-2xl placeholder:text-gray-600 outline-none mb-10 italic"
                    />
                </div>
               <div className="px-5 flex flex-col gap-5">
                 <button
                    onClick={onClose}
                    className=" w-full rounded-md  py-3 text-gray-300 transition bg-red-800 hover:bg-red-700 font-bahnschrift cursor-pointer"
                >
                    Withdraw
                </button>
                <button
                    onClick={onClose}
                    className=" w-full rounded-md  py-3 text-gray-300 transition bg-[#1E1E1E] hover:bg-[#2A2A2A] font-bahnschrift cursor-pointer"
                >
                    Cancel
                </button>
               </div>
            </div>
        </div>
    );
}

export default CreditModalCashOut;