import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { Theme } from '../../../context/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import Footer from '../../../components/common/Footer';

interface ThemeSelectionViewProps {
  onBack: () => void;
  username: string;
  verificationStatus: string;
}

const themes: { id: Theme; name: string; image: string }[] = [
  { id: '1', name: 'Theme 1', image: '/assets/themes/1.jpg' },
  { id: '2', name: 'Theme 2', image: '/assets/themes/2.jpg' },
  { id: '3', name: 'Theme 3', image: '/assets/themes/3.jpg' },
  { id: '4', name: 'Theme 4', image: '/assets/themes/4.jpg' },
  { id: '5', name: 'Theme 5', image: '/assets/themes/5.jpg' },
  { id: '6', name: 'Theme 6', image: '/assets/themes/6.jpg' },
  { id: '7', name: 'Theme 7', image: '/assets/themes/7.jpg' },
  { id: '8', name: 'Theme 8', image: '/assets/themes/8.jpg' },
  { id: '9', name: 'Theme 9', image: '/assets/themes/9.jpg' },
  { id: '10', name: 'Theme 10', image: '/assets/themes/10.jpg' },
  { id: '11', name: 'Theme 11', image: '/assets/themes/11.jpg' },
  { id: '12', name: 'Theme 12', image: '/assets/themes/12.jpg' },
  { id: '13', name: 'Theme 13', image: '/assets/themes/13.jpg' },
  { id: '14', name: 'Theme 14', image: '/assets/themes/14.jpg' },
  { id: '15', name: 'Theme 15', image: '/assets/themes/15.jpg' },
  { id: '16', name: 'Theme 16', image: '/assets/themes/16.jpg' },
  { id: '17', name: 'Theme 17', image: '/assets/themes/17.jpg' },
];

export default function ThemeSelectionView({ onBack, username, verificationStatus }: ThemeSelectionViewProps) {
  const { theme: currentTheme, setTheme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const idx = themes.findIndex(t => t.id === currentTheme);
    return idx >= 0 ? idx : 0;
  });

  const previewTheme = themes[selectedIndex].id;

  const handleActivate = () => {
    setTheme(previewTheme);
    onBack();
  };

  const handleDefault = () => {
    const defaultIndex = themes.findIndex(t => t.id === '1');
    if (defaultIndex >= 0) {
      setSelectedIndex(defaultIndex);
    }
  };

  // For touch swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      // Swipe left
      if (selectedIndex < themes.length - 1) setSelectedIndex(prev => prev + 1);
    } else if (diff < -50) {
      // Swipe right
      if (selectedIndex > 0) setSelectedIndex(prev => prev - 1);
    }
    setTouchStart(null);
  };

  return (
    <div className="min-h-screen text-white flex flex-col relative z-50 bg-[#0a0a0a]">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center relative mb-6">
            <button
              onClick={onBack}
              className="h-10 w-10 flex items-center justify-center absolute left-0"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-[20px] font-bold w-full text-center">Theme</h1>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-bold">{username}</h2>
              <p className="text-[14px] text-gray-400 mt-0.5">
                {verificationStatus.includes('*') ? (
                  <>
                    {verificationStatus.replace('*', '')}
                    <span className="text-red-500">*</span>
                  </>
                ) : (
                  verificationStatus
                )}
              </p>
            </div>
            <button
              onClick={handleDefault}
              className="px-6 py-2 rounded-lg bg-[#1E1E1E] text-white text-sm font-semibold border border-white/10"
            >
              Default
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          className="flex-1 relative w-full flex flex-col items-center justify-center min-h-[500px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-[75vh] max-h-[600px] flex items-center justify-center">
            {themes.map((theme, idx) => {
              const offset = idx - selectedIndex;
              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;

              let translateX = '0%';
              let scale = 1;
              let zIndex = 10;
              let opacity = 1;

              if (offset === -2) { translateX = '-110%'; scale = 0.8; zIndex = 0; opacity = 0.3; }
              if (offset === -1) { translateX = '-60%'; scale = 0.9; zIndex = 5; opacity = 0.6; }
              if (offset === 0) { translateX = '0%'; scale = 1; zIndex = 10; opacity = 1; }
              if (offset === 1) { translateX = '60%'; scale = 0.9; zIndex = 5; opacity = 0.6; }
              if (offset === 2) { translateX = '110%'; scale = 0.8; zIndex = 0; opacity = 0.3; }

              return (
                <div 
                  key={theme.id}
                  onClick={() => setSelectedIndex(idx)}
                  className="absolute w-[65%] h-[90%] transition-all duration-300 ease-out cursor-pointer"
                  style={{
                    transform: `translateX(${translateX}) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                >
                  <img 
                    src={theme.image} 
                    alt={theme.name} 
                    className="w-full h-full object-cover rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10"
                  />
                  {offset === 0 && (
                    <div className="absolute -bottom-8 left-0 right-0 text-center text-sm font-semibold tracking-widest uppercase">
                      HERE
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8 mb-4">
            {themes.slice(Math.max(0, selectedIndex - 4), Math.min(themes.length, selectedIndex + 5)).map((theme, idx) => {
              const actualIdx = Math.max(0, selectedIndex - 4) + idx;
              return (
                <div 
                  key={theme.id}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    actualIdx === selectedIndex ? 'bg-white scale-125' : 'bg-transparent border border-white/50'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Activate Button */}
        <div className="px-5 pb-8 pt-4">
          <button
            onClick={handleActivate}
            className="w-full h-[56px] rounded-lg text-white font-bold text-lg transition-all active:scale-95 bg-[#1E1E1E] hover:bg-[#2A2A2A] border border-[#333]"
          >
            Activate
          </button>
        </div>
      </div>
      
      <div className="px-5 py-4 bg-[#0a0a0a]">
        <Footer />
      </div>
    </div>
  );
}