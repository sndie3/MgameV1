import { X } from "lucide-react";

interface WalletModalProps {
    open: boolean;
    onClose: () => void;
    standardWallet: number;
    specialityWallet: number;
}

function WalletModal({
    open,
    onClose,
    standardWallet,
    specialityWallet
}: WalletModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-black text-white shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-end py-2 px-2">

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-white/10"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Balance */}
                <div className="px-6 mb-15 text-center">
                    <div className="mx-auto  flex h-25 w-40 items-center justify-center  ">
                        <img src="/assets/icons/manoy.png" alt="manoy" className="w-full h-full object-contain" />

                    </div>
                    <h2 className="text-2xl font-semibold font-bahnschrift py-4">WALLET</h2>

                    <div className="flex flex-col gap-5">
                        {/* Standard Wallet */}
                        <div className=" p-4">
                            <h1 className="mb-2 text-3xl font-bold text-white">
                                {standardWallet.toLocaleString("en-PH", {
                                    minimumFractionDigits: 2,
                                })}
                            </h1>

                            <p className="text-white text-md mb-4">STANDARD WALLET</p>

                            <div className="flex justify-between">
                                <button
                                    className="px-5 py-2 border border-gray-600 hover:border-gray-200 text-white-500 font-semibold transition rounded-full cursor-pointer"
                                >
                                    CASH-IN
                                </button>

                                <button
                                    className="px-5 py-2 border border-gray-600 hover:border-gray-200 text-white- font-semibold transition rounded-full cursor-pointer"
                                >
                                    CASH-OUT
                                </button>
                            </div>
                        </div>

                        {/* Speciality Wallet */}
                        <div className=" p-4">
                            <h1 className="mb-2 text-3xl font-bold text-white">
                                {specialityWallet.toLocaleString("en-PH", {
                                    minimumFractionDigits: 2,
                                })}
                            </h1>

                            <p className="text-white text-md mb-4">SPECIALITY WALLET</p>

                            <div className="flex justify-between">
                                <button
                                    className="px-5 py-2 border border-gray-600 hover:border-gray-200 text-white-500 font-semibold transition rounded-full cursor-pointer"
                                >
                                    CASH-IN
                                </button>

                                <button
                                    className="px-5 py-2 border border-gray-600 hover:border-gray-200 text-white- font-semibold transition rounded-full cursor-pointer"
                                >
                                    CASH-OUT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WalletModal;