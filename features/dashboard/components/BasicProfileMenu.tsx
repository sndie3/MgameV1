import type { UserProfile } from '../types/profile.types';

interface BasicProfileMenuProps {
  profile: UserProfile;
  onEditProfile: () => void;
}

export default function BasicProfileMenu({ profile, onEditProfile }: BasicProfileMenuProps) {
  return (
    <div className="px-5 py-6 font-bahnschrift">
      <div className="space-y-3">
        {/* Profile Edit Button */}
        <div 
          onClick={onEditProfile}
          className="h-[56px] bg-[#121212] rounded-lg border border-[#3A3A3A] flex items-center justify-center cursor-pointer hover:bg-[#1a1a1a] transition"
        >
          <span className="font-bold text-[18px] text-white">Profile Edit</span>
        </div>

        {/* Email Field */}
        <div 
          onClick={onEditProfile}
          className="h-[56px] bg-[#121212] rounded-lg border border-[#3A3A3A] flex items-center justify-between px-4 cursor-pointer hover:bg-[#1a1a1a] transition"
        >
          <span className="font-bold text-[16px] text-white truncate">
            Email: <span className="ml-2 font-normal">{profile.email || ''}</span>
          </span>
        </div>

        {/* Contact Field */}
        <div 
          onClick={onEditProfile}
          className="h-[56px] bg-[#121212] rounded-lg border border-[#3A3A3A] flex items-center justify-between px-4 cursor-pointer hover:bg-[#1a1a1a] transition"
        >
          <span className="font-bold text-[16px] text-white truncate">
            Contact: <span className="ml-2 font-normal">{profile.phoneNumber || ''}</span>
          </span>
        </div>

        {/* Theme Button */}
        <div className="h-[56px] bg-[#121212] rounded-lg border border-[#3A3A3A] flex items-center justify-center cursor-pointer hover:bg-[#1a1a1a] transition">
          <span className="font-bold text-[18px] text-white">Theme</span>
        </div>

        {/* Change Password Button */}
        <div className="h-[56px] bg-[#121212] rounded-lg border border-[#3A3A3A] flex items-center justify-center cursor-pointer hover:bg-[#1a1a1a] transition">
          <span className="font-bold text-[18px] text-white">Change Password</span>
        </div>
      </div>
    </div>
  );
}