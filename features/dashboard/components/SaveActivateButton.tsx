interface SaveActivateButtonProps {
  onSaveAndActivate: () => void;
}

export default function SaveActivateButton({ onSaveAndActivate }: SaveActivateButtonProps) {
  return (
    <div className="px-5 py-6">
      <button
        onClick={onSaveAndActivate}
        className="w-full py-4 rounded-lg text-lg font-semibold transition hover:opacity-80"
        style={{ backgroundColor: 'var(--button-color)' }}
      >
        Save & Activate
      </button>
    </div>
  );
}
