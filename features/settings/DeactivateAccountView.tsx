import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import Footer from '../../components/common/Footer';

export default function DeactivateAccountView() {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [reason, setReason] = useState('');

  const isValid = reason.trim().length > 0;

  const handleDeactivate = () => {
    if (!isValid) {
      showModal('warning', 'Reason Required', 'Please state a reason to proceed.');
      return;
    }

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');

    showModal(
      'success',
      'Account Deactivated',
      'Your account has been deactivated successfully. Thank you for being part of MGame.ph.'
    );

    setTimeout(() => {
      navigate('/login');
    }, 1500);
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
          <h1 className="text-[24px] font-semibold uppercase">Deactivate Account</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-5 py-6">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="REASON"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-[56px] bg-[#121212] text-center text-white placeholder:italic placeholder:text-[#666] outline-none uppercase rounded-none border-none"
          />

          <button
            onClick={handleDeactivate}
            disabled={!isValid}
            className="w-full h-[56px] flex items-center justify-center rounded-none border-none bg-[#121212] transition disabled:cursor-not-allowed"
          >
            <span className={`font-bold text-[18px] uppercase ${isValid ? 'text-white' : 'text-[#666]'}`}>
              Deactivate Now
            </span>
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
