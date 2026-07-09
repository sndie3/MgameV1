import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import Footer from '../../components/common/Footer';

export default function ChangeChatNameView() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const savedName = localStorage.getItem('chatName') || 'ROGER NICON';
  const [newName, setNewName] = useState('');

  const isValid = newName.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    localStorage.setItem('chatName', newName.trim());
    showModal('success', 'Chat Name Updated', `Your chat name is now ${newName.trim()}.`);
    setTimeout(() => navigate('/settings/chat-settings'), 1200);
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
          <h1 className="text-[24px] font-semibold uppercase">Change Chat Name</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-8 flex flex-col items-center">
        <p className="text-[14px] uppercase tracking-[0.2em] text-[#666] mb-2">Chat Name</p>
        <h2 className="text-[24px] font-bold uppercase mb-8">{savedName}</h2>

        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New Chat Name"
          className="w-full h-[56px] px-4 text-center bg-black text-white placeholder-[#666] rounded-none border border-[#666] outline-none uppercase tracking-widest"
        />

        <div className="w-full mt-6">
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full h-[56px] flex items-center justify-center rounded-none border-none bg-[#121212] transition"
          >
            <span className={`font-bold text-[18px] uppercase ${isValid ? 'text-white' : 'text-[#666]'}`}>
              Submit Change
            </span>
          </button>
        </div>
      </div>

      <div className="px-5 py-4">
        <Footer />
      </div>
    </div>
  );
}
