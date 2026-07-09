import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import Footer from '../../components/common/Footer';

const wallpapers = [
  { id: '1', name: 'Wallpaper 1', image: '/assets/chat-wallpapers/chat1.jpg' },
  { id: '2', name: 'Wallpaper 2', image: '/assets/chat-wallpapers/chat2.jpg' },
  { id: '3', name: 'Wallpaper 3', image: '/assets/chat-wallpapers/chat3.jpg' },
];

export default function ChatWallpaperView() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const saved = localStorage.getItem('chatWallpaper');
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const idx = wallpapers.findIndex((w) => w.image === saved);
    return idx >= 0 ? idx : 0;
  });

  const normalizedIndex = ((selectedIndex % wallpapers.length) + wallpapers.length) % wallpapers.length;
  const previewWallpaper = wallpapers[normalizedIndex]?.image;

  const handleActivate = () => {
    if (previewWallpaper) {
      localStorage.setItem('chatWallpaper', previewWallpaper);
      showModal('success', 'Chat Wallpaper Set', 'Your chat wallpaper has been updated.');
      setTimeout(() => navigate('/settings/chat-settings'), 1200);
    }
  };

  const handleDefault = () => {
    localStorage.removeItem('chatWallpaper');
    showModal('success', 'Default Wallpaper', 'Chat wallpaper has been reset to default.');
    setTimeout(() => navigate('/settings/chat-settings'), 1200);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--chat-wallpaper-preview',
      previewWallpaper ? `url(${previewWallpaper})` : 'none'
    );
  }, [previewWallpaper]);

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      setSelectedIndex((prev) => prev + 1);
    } else if (diff < -50) {
      setSelectedIndex((prev) => prev - 1);
    }
    setTouchStart(null);
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col relative z-50"
      style={{
        backgroundImage: 'var(--chat-wallpaper-preview)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay to ensure readability */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center relative mb-6">
            <button
              onClick={() => navigate('/settings/chat-settings')}
              className="h-10 w-10 flex items-center justify-center absolute left-0"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-[20px] font-bold w-full text-center">Chat Wallpaper</h1>
            <button
              onClick={handleDefault}
              className="absolute right-0 px-4 py-2 h-[40px] rounded-none bg-[#121212] text-white text-sm font-semibold border-none hover:opacity-80 transition"
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
            {[-2, -1, 0, 1, 2].map((offset) => {
              const absoluteIdx = selectedIndex + offset;
              const actualIdx = ((absoluteIdx % wallpapers.length) + wallpapers.length) % wallpapers.length;
              const wallpaper = wallpapers[actualIdx];

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
                  key={`${absoluteIdx}-${wallpaper.id}`}
                  onClick={() => setSelectedIndex(absoluteIdx)}
                  className="absolute w-[65%] h-[90%] transition-all duration-300 ease-out cursor-pointer"
                  style={{
                    transform: `translateX(${translateX}) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                >
                  <img
                    src={wallpaper.image}
                    alt={wallpaper.name}
                    className="w-full h-full object-cover rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10"
                  />
                  {offset === 0 && (
                    <div className="absolute -bottom-8 left-0 right-0 text-center text-sm font-semibold tracking-widest uppercase">
                      {wallpaper.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8 mb-4">
            {wallpapers.map((_, idx) => (
              <div
                key={`dot-${idx}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === normalizedIndex ? 'bg-white scale-125' : 'bg-transparent border border-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Activate Button */}
        <div className="px-5 pb-8 pt-4">
          <button
            onClick={handleActivate}
            className="w-full h-[56px] rounded-none border-none bg-[#121212] text-white font-bold text-lg transition hover:opacity-80"
          >
            Activate
          </button>
        </div>
      </div>

      <div className="px-5 py-4 relative z-10 bg-black/40 backdrop-blur-sm">
        <Footer />
      </div>
    </div>
  );
}
