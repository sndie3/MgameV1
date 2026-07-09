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
                className="w-full max-w-lg bg-black text-white shadow-2xl"
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
                    <div className="mx-auto  flex h-30 w-40 items-center justify-center  ">
                        <img src="/assets/icons/manoy.png" alt="manoy" className="w-full h-full object-contain" />

                    </div>
                    <h2 className="text-2xl font-semibold font-bahnschrift py-6">WALLET</h2>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col bg-red-800 hover:bg-red-700 py-1.5">
                            <h1 className="mt-1 text-3xl font-bold text-white">
                                ₱
                                {standardWallet.toLocaleString("en-PH", {
                                    minimumFractionDigits: 2,
                                })}
                            </h1>
                            <p className="text-gray-400 text-sm">Standard Wallet</p>
                        </div>

                        <div className="flex flex-col bg-[#1d1d1d] hover:bg-[#252525] py-1.5">
                            <h1 className="mt-1 text-3xl font-bold text-white">
                                ₱
                                {specialityWallet.toLocaleString("en-PH", {
                                    minimumFractionDigits: 2,
                                })}
                            </h1>
                            <p className="text-gray-400 text-sm">Speciality Wallet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WalletModal;