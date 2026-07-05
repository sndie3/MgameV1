import { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/common/Footer';
import ImageUpload from '../../../components/common/ImageUpload';

interface UserProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  province: string;
  maritalStatus: string;
  locationOfWork: string;
  email: string;
  businessType: string;
  sourceOfIncome: string;
  gameVenue: string;
}

interface VerificationImages {
  selfieWithId: string | null;
  frontId: string | null;
  backId: string | null;
}

const SOURCE_OF_INCOME_OPTIONS = [
  'BUSINESS',
  'EMPLOYMENT',
  'COMMISSION',
  'OTHER EARNINGS',
];

const CIVIL_STATUS_OPTIONS = [
  'SINGLE',
  'MARRIED',
  'SEPARATED',
  'WIDOWED',
];

const GAME_VENUE_OPTIONS = [
  'GMALL',
  'BINGO BEE MANDAUE',
  'LAFUERZA BULACAN',
  'NEWALLSTAR ANTIPOLO',
  'PAULJS ANTIPOLO',
  'PAULJS SAN JUAN',
  'TREGS BAGUIO',
  'TREGS PANGASINAN',
  'TREGS CALAMBA',
  'TREGS TARLAC',
];

export default function Profile() {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    province: '',
    maritalStatus: '',
    locationOfWork: '',
    email: '',
    businessType: '',
    sourceOfIncome: '',
    gameVenue: '',
  });

  const [images, setImages] = useState<VerificationImages>({
    selfieWithId: null, // This would be pre-filled from registration
    frontId: null,
    backId: null,
  });

  useEffect(() => {
    const status = localStorage.getItem('verificationStatus');
    if (status) {
      setVerificationStatus(status.toUpperCase());
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Load registration data from localStorage
    const registerFormData = localStorage.getItem('registerFormData');
    if (registerFormData) {
      try {
        const parsedRegistration = JSON.parse(registerFormData);
        setProfile(prev => ({
          ...prev,
          firstName: parsedRegistration.firstName || '',
          middleName: parsedRegistration.middleName || '',
          lastName: parsedRegistration.lastName || '',
          email: parsedRegistration.email || '',
          phoneNumber: parsedRegistration.mobileNumber || '',
        }));
      } catch (error) {
        console.error('Error parsing registration data:', error);
      }
    }

    // Load profile data from localStorage if available (overrides registration data)
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(prev => ({ ...prev, ...parsedProfile }));
      } catch (error) {
        console.error('Error parsing user profile data:', error);
      }
    }

    // Load selfie with ID from registration
    const storedSelfie = localStorage.getItem('selfieWithId');
    if (storedSelfie) {
      setImages(prev => ({ ...prev, selfieWithId: storedSelfie }));
    }

    // Load front ID from localStorage
    const storedFrontId = localStorage.getItem('frontId');
    if (storedFrontId) {
      setImages(prev => ({ ...prev, frontId: storedFrontId }));
    }

    // Load back ID from localStorage
    const storedBackId = localStorage.getItem('backId');
    if (storedBackId) {
      setImages(prev => ({ ...prev, backId: storedBackId }));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If clicking anywhere outside a dropdown, close the dropdown
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageUpload = (type: 'frontId' | 'backId', compressedDataUrl: string, _compressedFile: File) => {
    setImages(prev => ({ ...prev, [type]: compressedDataUrl }));
  };

  const handleImageRemove = (type: 'frontId' | 'backId') => {
    setImages(prev => ({ ...prev, [type]: null }));
  };

  const handleSaveAndActivate = () => {
    // Validate all required fields
    const requiredFields: (keyof UserProfile)[] = [
      'address',
      'city',
      'province',
      'maritalStatus',
      'gameVenue',
      'email',
      'sourceOfIncome',
    ];

    const emptyFields = requiredFields.filter(field => !profile[field] || profile[field].trim() === '');

    if (emptyFields.length > 0) {
      const fieldLabels: Record<string, string> = {
        address: 'Address',
        city: 'City',
        province: 'Province',
        maritalStatus: 'Marital Status',
        gameVenue: 'Game Venue',
        email: 'Email',
        sourceOfIncome: 'Source of Income',
      };

      const missingFields = emptyFields.map(field => fieldLabels[field]).join(', ');
      alert(`Please fill in all required fields: ${missingFields}`);
      return;
    }

    // Validate image uploads
    if (!images.frontId || !images.backId) {
      alert('Please upload both front and back of your ID.');
      return;
    }

    // Save profile data to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));

    // Save uploaded images to localStorage
    if (images.frontId) {
      localStorage.setItem('frontId', images.frontId);
    }
    if (images.backId) {
      localStorage.setItem('backId', images.backId);
    }

    // Auto-approve verification for now
    // TODO: Backend approval - Uncomment this section when backend is ready
    /*
    // Send verification data to backend for approval
    const verificationData = {
      userId: localStorage.getItem('userId'),
      frontId: images.frontId,
      backId: images.backId,
      profile: profile,
    };
    
    fetch('/api/verify-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verificationData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.approved) {
        setVerificationStatus('Fully Verified');
        localStorage.setItem('verificationStatus', 'Fully Verified');
      }
    });
    */

    // Auto-approve for now (remove this when backend is implemented)
    setVerificationStatus('Fully Verified');
    localStorage.setItem('verificationStatus', 'Fully Verified');
    alert('Verification submitted successfully! You are now fully verified.');
  };

  const handleUpdateNow = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Header */}
      <div className="bg-[#0A0A0A] rounded-t-[32px] px-5 pt-6 pb-6">
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={() => navigate('/dashboard')}
            className="h-12 w-12 rounded-full bg-[#1A1A1A] flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[24px] font-semibold flex-1 text-center">Profile</h1>
          <div className="w-12"></div>
        </div>

        {/* User Info Section */}
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
          <button
            onClick={handleUpdateNow}
            className={`h-[52px] px-6 rounded-[26px] text-sm font-semibold uppercase shadow-lg transition flex flex-col items-center justify-center leading-tight ${
              isEditing ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-[#181818] text-white hover:bg-[#1f1f1f]'
            }`}
          >
            <span>UPDATE</span>
            <span>NOW!</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">

      {/* Personal Information Edit Form */}
      <>
        <div className="px-5 py-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="space-y-3">
              {[
                { field: 'firstName', label: 'First Name', readonly: true },
                { field: 'middleName', label: 'Middle Name', readonly: true },
                { field: 'lastName', label: 'Last Name', readonly: true },
                { field: 'phoneNumber', label: 'Mobile Number', readonly: true },
                { field: 'street', label: 'Street', readonly: false },
                { field: 'city', label: 'Mun/City', readonly: false },
                { field: 'province', label: 'Province', readonly: false },
                { field: 'maritalStatus', label: "Civil Status", readonly: false, isDropdown: true, options: CIVIL_STATUS_OPTIONS },
                { field: 'gameVenue', label: 'Game Venue', readonly: false, isDropdown: true, options: GAME_VENUE_OPTIONS },
                { field: 'email', label: 'Email', readonly: false },
                { field: 'sourceOfIncome', label: 'Source of Income', readonly: false, isDropdown: true, options: SOURCE_OF_INCOME_OPTIONS },
              ].map((item) => (
                <div key={item.field} className={`dropdown-container h-[56px] bg-[#121212] rounded-lg border border-[#3A3A3A] flex items-center relative ${item.isDropdown ? 'overflow-visible' : ''}`}>
                  {item.isDropdown ? (
                    <div 
                      className={`flex-1 flex items-center justify-between pl-4 pr-4 cursor-pointer w-full h-full ${!isEditing ? 'opacity-50 pointer-events-none' : ''}`}
                      onClick={() => {
                        if (isEditing) setOpenDropdown(openDropdown === item.field ? null : item.field);
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
                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#3A3A3A] rounded-lg shadow-xl z-[100] max-h-60 overflow-y-auto">
                          {item.options?.map((option) => (
                            <div
                              key={option}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProfileChange(item.field as keyof UserProfile, option);
                                setOpenDropdown(null);
                              }}
                              className={`px-4 py-3 hover:bg-[#2a2a2a] cursor-pointer text-sm ${
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
                          value={profile[item.field as keyof UserProfile]}
                          onChange={(e) => handleProfileChange(item.field as keyof UserProfile, e.target.value)}
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

          {/* Verification Documents Section */}
          <div className="px-5 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 align-items-stretch">
              {/* Front of ID */}
              <div className="bg-[#1d1d1d] rounded-lg p-4 flex flex-col">
                <ImageUpload
                  label="Front of ID"
                  value={images.frontId}
                  onChange={(compressedDataUrl, compressedFile) => handleImageUpload('frontId', compressedDataUrl, compressedFile)}
                  onRemove={() => handleImageRemove('frontId')}
                  height="180px"
                  maxWidth={1920}
                  maxHeight={1080}
                  quality={0.85}
                  format="image/jpeg"
                  objectFit="cover"
                />
              </div>

              {/* Back of ID */}
              <div className="bg-[#1d1d1d] rounded-lg p-4 flex flex-col">
                <ImageUpload
                  label="Back of ID"
                  value={images.backId}
                  onChange={(compressedDataUrl, compressedFile) => handleImageUpload('backId', compressedDataUrl, compressedFile)}
                  onRemove={() => handleImageRemove('backId')}
                  height="180px"
                  maxWidth={1920}
                  maxHeight={1080}
                  quality={0.85}
                  format="image/jpeg"
                  objectFit="cover"
                />
              </div>

              {/* Selfie with ID (already provided during registration) */}
              <div className="bg-[#1d1d1d] rounded-lg p-4 flex flex-col">
                <p className="text-sm font-medium mb-2 text-left">Selfie with ID</p>
                {images.selfieWithId ? (
                  <div className="w-full h-[180px] bg-[#2a2a2a] rounded-lg flex items-center justify-center overflow-hidden flex-1">
                    <img src={images.selfieWithId} alt="Selfie with ID" className="w-full h-full object-cover object-position-center" />
                  </div>
                ) : (
                  <div className="w-full h-[180px] rounded-lg bg-[#2a2a2a] flex items-center justify-center">
                    <p className="max-w-[80%] text-center text-sm text-gray-500">
                      Provided during registration
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Save & Activate Button */}
          <div className="px-5 py-6">
            <button
              onClick={handleSaveAndActivate}
              className="w-full py-4 bg-[#1a1a1a] rounded-lg text-lg font-semibold hover:bg-[#2a2a2a] transition"
            >
              Save & Activate
            </button>
          </div>
        </>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-none">
        <Footer />
      </div>
    </div>
  );
}
