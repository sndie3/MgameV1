import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import Footer from '../../components/common/Footer';

const topOptions = [
  'Chat Wallpaper',
  'Change Chat Name',
  'Chat List View',
  'App Icon',
];

const defaultToggles: Record<string, boolean> = {
  'Show 21+ Content': true,
  'Direct Share': true,
};

const toggleSubtitles: Record<string, string> = {
  'Show 21+ Content': 'Do not hide media that contains content suitable only for adults.',
  'Direct Share': 'Show share application link.',
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center px-1 rounded-full transition ${
        checked ? 'bg-[#007acc]' : 'bg-[#333]'
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full transform transition ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function ChatSettingsView() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const saved = localStorage.getItem('chatSettings');
  const initialToggles = saved ? (JSON.parse(saved) as Record<string, boolean>) : defaultToggles;

  const [toggles, setToggles] = useState<Record<string, boolean>>(initialToggles);

  const handleToggle = (key: string) => {
    const updated = { ...toggles, [key]: !toggles[key] };
    setToggles(updated);
    localStorage.setItem('chatSettings', JSON.stringify(updated));
  };

  const handleOptionClick = (option: string) => {
    showModal('info', option, `${option} settings will be available soon.`);
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
          <h1 className="text-[24px] font-semibold uppercase">Chat Settings</h1>
        </div>
      </div>

      {/* Options */}
      <div className="flex-1 px-5 py-6">
        <div className="space-y-3">
          {topOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className="w-full h-[56px] flex items-center justify-center bg-[#121212] rounded-none border-none transition"
            >
              <span className="font-bold text-[18px] uppercase">{option}</span>
            </button>
          ))}

          <div className="pt-4 pb-2 text-left">
            <span className="font-bold text-[18px] uppercase">Other Settings:</span>
          </div>

          {Object.entries(toggles).map(([label, checked]) => (
            <div
              key={label}
              className="w-full min-h-[72px] px-4 flex items-center justify-between bg-black rounded-none border-none"
            >
              <div className="flex flex-col">
                <span className="font-bold text-[18px]">{label}</span>
                <span className="text-[12px] italic text-[#aaa]">{toggleSubtitles[label]}</span>
              </div>
              <Toggle checked={checked} onChange={() => handleToggle(label)} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        <Footer />
      </div>
    </div>
  );
}
