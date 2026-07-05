interface SaveActivateButtonProps {
  onSaveAndActivate: () => void;
}

export default function SaveActivateButton({ onSaveAndActivate }: SaveActivateButtonProps) {
  return (
    <div className="px-5 py-6">
      <button
        onClick={onSaveAndActivate}
        className="w-full py-4 bg-[#1a1a1a] rounded-lg text-lg font-semibold hover:bg-[#2a2a2a] transition"
      >
        Save & Activate
      </button>
    </div>
  );
}
