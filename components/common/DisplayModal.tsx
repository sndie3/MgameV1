
interface DisplayModalProps {
    open: boolean;
    type?: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export default function DisplayModal({
    open,
    type = "info",
    title,
    message,
    confirmText = "OK",
    cancelText,
    onConfirm,
    onCancel,
}: DisplayModalProps) {
    if (!open) return null;

    const colors = {
        success: "border-green-500",
        error: "border-red-500",
        warning: "border-yellow-500",
        info: "border-blue-500",
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
                className={`w-[90%] max-w-sm rounded-2xl bg-[#1d1d1d] border-t-4 ${colors[type]} p-6 shadow-xl`}
            >
                <h2 className="text-md font-bold text-white">{title}</h2>

                <p className="mt-3 text-sm text-gray-300">{message}</p>

                <div className="mt-6 flex justify-end gap-3">
                    {cancelText && (
                        <button
                            onClick={onCancel}
                            className="rounded-lg border border-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                        >
                            {cancelText}
                        </button>
                    )}

                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}