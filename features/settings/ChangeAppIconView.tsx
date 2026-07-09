import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { applyAppIcon, getSavedAppIcon } from '../../utils/appIcon';
import Footer from '../../components/common/Footer';

const icons = [
  { id: '1', name: 'Icon 1', image: '/assets/app-icons/icon2.png' },
  { id: '2', name: 'Icon 2', image: '/assets/app-icons/icon3.png' },
  { id: '3', name: 'Icon 3', image: '/assets/app-icons/icon1.png' },
];

export default function ChangeAppIconView() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const saved = getSavedAppIcon();
  const [selected, setSelected] = useState<string>(() => {
    const idx = icons.findIndex((icon) => icon.image === saved);
    return idx >= 0 ? icons[idx].id : icons[0].id;
  });

  useEffect(() => {
    applyAppIcon(saved);
  }, [saved]);

  const handleActivate = () => {
    const icon = icons.find((i) => i.id === selected);
    if (!icon) return;
    localStorage.setItem('appIcon', icon.image);
    applyAppIcon(icon.image);
    showModal('success', 'App Icon Updated', 'Your app icon has been changed.');
  };

  return (
    <div className="min-h-screen text-white flex flex-col bg-black font-bahnschrift">
      {/* Header */}
      <div className="px-5 pt-6 pb-6 bg-[#121212]">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate('/settings/chat-settings')}
            className="absolute left-0 h-12 w-12 rounded-full flex items-center justify-center transition hover:opacity-80"
            style={{ backgroundColor: 'var(--button-color)' }}
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[24px] font-semibold uppercase">App Icon</h1>
        </div>
      </div>

      {/* Icons grid */}
      <div className="flex-1 px-5 py-4">
        <div className="grid grid-cols-2 gap-4">
          {icons.map((icon) => {
            const isSelected = selected === icon.id;
            return (
              <button
                key={icon.id}
                onClick={() => setSelected(icon.id)}
                className={`relative aspect-square flex items-center justify-center bg-[#121212] rounded-none border-none transition ${isSelected ? 'ring-2 ring-white' : ''}`}
              >
                {isSelected && (
                  <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-yellow-400 border border-white" />
                )}
                <img
                  src={icon.image}
                  alt={icon.name}
                  className="w-[80%] h-[80%] object-contain"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Activate */}
      <div className="px-5 pb-8">
        <button
          onClick={handleActivate}
          className="w-full h-[56px] flex items-center justify-center rounded-none border-none bg-black text-white font-bold text-lg transition"
        >
          Activate
        </button>
      </div>

      <div className="px-5 py-4">
        <Footer />
      </div>
    </div>
  );
}
