import { useState } from "react";

interface CreditModalProps {
    open: boolean;
    onClose: () => void;
    ecasinoWallet: number
    pinoyGamesWallet:number
}

function CreditModalCashOut({
    open,
    onClose,
    ecasinoWallet,
    pinoyGamesWallet
}: CreditModalProps) {
    if (!open) return null;
    const paymentMethods = ["GCASH", "MAYA", "QR PH"];

    const [selectedMethod, setSelectedMethod] = useState("GCASH");
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black px-4 "
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm rounded-lg bg-black p-6  font-bahnschrift"
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

                <div className="space-y-4">
                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className="font-bahnschrift w-full rounded-md py-3 text-lg font-semibold text-white transition bg-red-800 hover:bg-red-700 cursor-pointer flex-col"
                    >
                        <p className="text-2xl">{Number(ecasinoWallet.toFixed(2))}</p>
                        
                        <p>E-CASINO WALLET</p>
                    </button>

                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className="font-bahnschrift w-full rounded-md  py-3 text-lg font-semibold text-white transition bg-red-800 hover:bg-red-700 cursor-pointer flex-col"
                    >
                        <p className="text-2xl">{Number(pinoyGamesWallet.toFixed(2))}</p>
                        <p>PINOY GAMES WALLET</p>
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="mt-6 w-full rounded-md bg-[#171717] py-3 text-gray-300 transition hover:bg-[#252525] font-bahnschrift cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default CreditModalCashOut;