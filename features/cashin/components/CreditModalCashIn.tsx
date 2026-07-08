
interface CreditModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (option: "e-casino" | "pinoy-games") => void;
    amount:number
}

function CreditModalCashIn({
    open,
    onClose,
    onSelect,
    amount
}: CreditModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black px-4 font-bahnschrift"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm rounded-lg bg-black p-6 "
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex place-content-center">
                    <img src="/assets/icons/manoy.png" alt="Manoy" className="h-20 object-contain" />
                </div>
                <h2 className="text-center text-[clamp(0.5rem,5vw,1.5rem)] mt-4 font-bold text-white mb-6">
                    CASH IN
                </h2>
                <h2 className="text-center text-4xl font-bold text-white mb-6">
                    {Number(amount).toFixed(2)}
                </h2>
                <h2 className="text-center text-xl font-bold text-white mb-6">
                    SELECT YOUR WALLET
                </h2>

                <div className="space-y-4">
                    <button
                        onClick={() => {
                            onSelect("e-casino");
                            onClose();
                        }}
                        className="w-full rounded-md  py-4 text-lg font-semibold text-white transition bg-red-800 hover:bg-red-700cursor-pointer"
                    >
                        E-Casino
                    </button>

                    <button
                        onClick={() => {
                            onSelect("pinoy-games");
                            onClose();
                        }}
                        className="w-full rounded-md  py-4 text-lg font-semibold text-white transition bg-red-800 hover:bg-red-700 cursor-pointer"
                    >
                        Pinoy Games
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full rounded-md bg-[#171717] py-3 text-gray-300 transition hover:bg-[#252525] font-bahnschrift"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default CreditModalCashIn;