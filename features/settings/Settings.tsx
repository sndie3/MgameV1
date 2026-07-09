import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/common/Footer';

const settingsOptions = [
  'Bet Limit',
  'Self Exclusion',
  'Cash-In Limit',
  'Notifications',
  'Licenses',
  'System License',
  'Chat Settings',
  'Profile Security',
  'DEACTIVIATE ACCOUNT',
];

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white flex flex-col bg-black font-bahnschrift">
      {/* Header */}
      <div className="px-5 pt-6 pb-6 bg-[#121212]">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="absolute left-0 h-12 w-12 rounded-full flex items-center justify-center transition hover:opacity-80"
            style={{ backgroundColor: 'var(--button-color)' }}
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[24px] font-semibold">Settings</h1>
        </div>
      </div>

      {/* Menu Options */}
      <div className="flex-1 px-5 py-6">
        <div className="space-y-3">
          {settingsOptions.map((option) => (
            <button
              key={option}
              className="w-full h-[56px] flex items-center justify-center bg-[#121212] hover:opacity-80 transition"
            >
              <span className="font-bold text-[18px] uppercase">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4">
        <Footer />
      </div>
    </div>
  );
}
