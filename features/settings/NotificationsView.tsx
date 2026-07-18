import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/common/Footer';

const defaultSettings: Record<string, boolean> = {
  '1 on 1 Messages': true,
  'Support Messages': true,
  'Promotional Messages': true,
  'Service Notifications': true,
  'Combined Notifications': true,
  'Alert in taskbar': true,
  'Game Updates': true,
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

export default function NotificationsView() {
  const navigate = useNavigate();

  const saved = localStorage.getItem('notifications');
  const initialSettings = saved ? (JSON.parse(saved) as Record<string, boolean>) : defaultSettings;

  const [settings, setSettings] = useState<Record<string, boolean>>(initialSettings);

  const handleToggle = (key: string) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
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
          <h1 className="text-[24px] font-semibold uppercase">Notifications</h1>
        </div>
      </div>

      {/* Options */}
      <div className="flex-1 px-5 py-6">
        <div className="space-y-3">
          {Object.entries(settings).map(([label, checked]) => (
            <div
              key={label}
              className="w-full h-[56px] px-4 flex items-center justify-between bg-[#121212] rounded-none border-none"
            >
              <span className="font-bold text-[18px] uppercase">{label}</span>
              <Toggle checked={checked} onChange={() => handleToggle(label)} />
            </div>
          ))}
        </div>
      </div>
{/* 
      <div className="text-center text-[#666] text-sm uppercase tracking-widest mb-2">
        Policies
      </div> */}

      <div className="px-5 py-4">
        <Footer />
      </div>
    </div>
  );
}
