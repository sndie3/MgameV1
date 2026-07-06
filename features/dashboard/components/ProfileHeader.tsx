import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps {
  username: string;
  verificationStatus: string;
  isEditing: boolean;
  showDetailedForm: boolean;
  onUpdateNow: () => void;
  onBack?: () => void;
}

export default function ProfileHeader({
  username,
  verificationStatus,
  isEditing,
  showDetailedForm,
  onUpdateNow,
  onBack,
}: ProfileHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (showDetailedForm && onBack) {
      onBack();
    } else {
      localStorage.setItem('openSidebar', 'true');
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-[#0A0A0A] rounded-t-[32px] px-5 pt-6 pb-6">
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={handleBack}
          className="h-12 w-12 rounded-full bg-[#1A1A1A] flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-[24px] font-semibold flex-1 text-center">Profile</h1>
        <div className="w-12"></div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold">{username}</h2>
          <p className="text-[15px] text-gray-400 mt-1">
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
        {showDetailedForm && (
          <button
            onClick={onUpdateNow}
            className={`h-[52px] px-6 rounded-[26px] text-sm font-semibold uppercase shadow-lg transition flex flex-col items-center justify-center leading-tight ${
              isEditing ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-[#181818] text-white hover:bg-[#1f1f1f]'
            }`}
          >
            <span>UPDATE</span>
            <span>NOW!</span>
          </button>
        )}
      </div>
    </div>
  );
}
