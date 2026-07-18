import { useState, useRef, useLayoutEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import Footer from '../../components/common/Footer';

const presets = [1000, 2000, 5000, 10000];
const MAX_AMOUNT = 1_000_000;

export default function CashInLimitView() {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');

  const handlePresetClick = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const integerPart = e.target.value.split('.')[0].replace(/\D/g, '');
    if (integerPart === '' || integerPart.length <= 7) {
      setCustomAmount(integerPart);
      setSelectedPreset(null);
    }
  };

  const customValue = customAmount ? Number(customAmount) : 0;
  const isCustomValid = customValue > 0 && customValue <= MAX_AMOUNT;
  const canSubmit = selectedPreset !== null || isCustomValid;

  const displayValue = customAmount
    ? Number(customAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '';

  useLayoutEffect(() => {
    if (inputRef.current && customAmount) {
      const decimalIndex = inputRef.current.value.lastIndexOf('.');
      if (decimalIndex > 0) {
        inputRef.current.setSelectionRange(decimalIndex, decimalIndex);
      }
    }
  }, [customAmount]);

  const handleSubmit = () => {
    if (!canSubmit) {
      showModal('warning', 'Invalid Amount', 'Please select a preset amount or enter a valid custom amount.');
      return;
    }

    if (customAmount && customValue > MAX_AMOUNT) {
      showModal('warning', 'Amount Too High', `Maximum cash-in limit is ${MAX_AMOUNT.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`);
      return;
    }

    const amount = selectedPreset !== null ? selectedPreset : customValue;
    localStorage.setItem('cashInLimit', String(amount));
    showModal('success', 'Cash-In Limit Set', `Your cash-in limit has been updated to ₱ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`,'CONFIRM');
  };

  return (
    <div className="min-h-screen text-white flex flex-col bg-black font-bahnschrift">
      {/* Header */}
      <div className="px-5 pt-6 pb-6 bg-[#121212]">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate('/settings')}
            className="absolute left-0 h-12 w-12 rounded-full flex items-center justify-center transition hover:opacity-80"
            style={{ backgroundColor: 'var(--button-color)' }}
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[24px] font-semibold uppercase">Cash-In Limit</h1>
        </div>
      </div>

      {/* Options */}
      <div className="flex-1 px-5 py-6">
        <div className="space-y-3">
          {presets.map((amount) => (
            <button
              key={amount}
              onClick={() => handlePresetClick(amount)}
              className={`w-full h-[56px] flex items-center justify-center rounded-none bg-[#121212] transition ${
                selectedPreset === amount ? 'border border-white' : 'border-none'
              }`}
            >
              <span className="font-bold text-[18px] uppercase">
                {amount.toLocaleString()}
              </span>
            </button>
          ))}

          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            placeholder="Enter any amount up to ₱1,000,000.00."
            value={displayValue}
            onChange={handleCustomChange}
            className="w-full h-[56px] bg-[#121212] text-center text-white placeholder:italic placeholder:text-[#666] outline-none uppercase rounded-none border-none"
          />

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full h-[56px] flex items-center justify-center rounded-none border-none bg-[#121212] transition disabled:cursor-not-allowed"
          >
            <span className={`font-bold text-[18px] uppercase ${canSubmit ? 'text-white' : 'text-[#666]'}`}>Submit</span>
          </button>
        </div>
      </div>

      <div className="text-center text-[#666] text-sm uppercase tracking-widest mb-2">
        Policies
      </div>

      <div className="px-5 py-4">
        <Footer />
      </div>
    </div>
  );
}
