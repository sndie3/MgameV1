import { Edit2, ChevronDown } from 'lucide-react';
import type { UserProfile } from '../types/profile.types';
import { FORM_FIELDS_CONFIG } from '../constants/profileConstants';

interface PersonalInformationFormProps {
  profile: UserProfile;
  isEditing: boolean;
  openDropdown: string | null;
  onProfileChange: (field: keyof UserProfile, value: string) => void;
  onDropdownToggle: (field: string) => void;
}

export default function PersonalInformationForm({
  profile,
  isEditing,
  openDropdown,
  onProfileChange,
  onDropdownToggle,
}: PersonalInformationFormProps) {
  return (
    <div className="px-5 py-6">
      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
      <div className="space-y-3">
        {FORM_FIELDS_CONFIG.map((item) => (
          <div key={item.field} className={`dropdown-container h-[56px] rounded-lg border border-white/10 flex items-center relative ${'isDropdown' in item && item.isDropdown ? 'overflow-visible' : ''}`} style={{ backgroundColor: 'var(--card-color)' }}>
            {'isDropdown' in item && item.isDropdown ? (
              <div 
                className={`flex-1 flex items-center justify-between pl-4 pr-4 cursor-pointer w-full h-full ${!isEditing ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => {
                  if (isEditing) onDropdownToggle(item.field);
                }}
              >
                <span className={`font-bold text-[18px] uppercase truncate ${profile[item.field as keyof UserProfile] ? 'text-white' : 'text-gray-400'}`}>
                  {profile[item.field as keyof UserProfile] || 'SELECT'}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[13px] italic text-[#6E727A] font-medium">{item.label}</span>
                  <ChevronDown size={20} className="text-[#8A8F98]" />
                </div>
                
                {openDropdown === item.field && isEditing && (
                  <div className="absolute top-full left-0 right-0 mt-1 border border-white/10 rounded-lg shadow-xl z-[100] max-h-60 overflow-y-auto" style={{ backgroundColor: 'var(--button-color)' }}>
                    {'options' in item && item.options?.map((option: string) => (
                      <div
                        key={option}
                        onClick={(e) => {
                          e.stopPropagation();
                          onProfileChange(item.field as keyof UserProfile, option);
                          onDropdownToggle(item.field);
                        }}
                        className={`px-4 py-3 cursor-pointer text-sm hover:opacity-80 ${
                          profile[item.field as keyof UserProfile] === option ? 'text-white font-bold' : 'text-white'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex-1 pl-4">
                  <input
                    type="text"
                    value={profile[item.field as keyof UserProfile] || ''}
                    onChange={(e) => onProfileChange(item.field as keyof UserProfile, e.target.value)}
                    disabled={item.readonly || !isEditing}
                    readOnly={item.readonly}
                    className={`w-full bg-transparent text-white font-bold text-[18px] uppercase outline-none ${
                      item.readonly ? 'cursor-default pointer-events-none' : ''
                    } ${!isEditing && !item.readonly ? 'cursor-default' : ''}`}
                  />
                </div>
                <div className="pr-4 flex items-center gap-2">
                  <span className="text-[13px] italic text-[#6E727A] font-medium">{item.label}</span>
                  {!item.readonly && (
                    <Edit2 
                      size={20} 
                      className="text-[#8A8F98] opacity-75 hover:opacity-100 hover:text-[#B0B4BB] transition-all duration-200"
                    />
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
