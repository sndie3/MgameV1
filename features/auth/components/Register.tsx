import { useState, useRef, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
//import Footer from '../../common/Footer';
import type { RegisterFormData } from '../../../Interfaces/Auth';
import { useModal } from "../../../context/ModalContext";

export default function Register() {
  const [selfie, setSelfie] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [formData, setFormData] = useState<RegisterFormData>(() => {
    const cachedData = localStorage.getItem('registerFormData');
    if (cachedData) {
      try {
        return JSON.parse(cachedData);
      } catch (error) {
        console.error('Error parsing cached form data:', error);
      }
    }
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      birthMonth: '',
      birthDay: '',
      birthYear: '',
      password: ''
    };
  });

  // Cache form data on change
  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    localStorage.setItem('registerFormData', JSON.stringify(updatedData));
  };

  // Clear cached form data
  const clearCache = () => {
    localStorage.removeItem('registerFormData');
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      birthMonth: '',
      birthDay: '',
      birthYear: '',
      password: ''
    });
  };

  const handleActivate = () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.mobileNumber || !formData.birthMonth || !formData.birthDay || 
        !formData.birthYear || !formData.password) {
      showModal(
        "warning",
        "Missing Required Fields",
        "Please fill in all required fields"
      );
      return;
    }

    // Determine verification status based on selfie
    const verificationStatus = selfie ? 'semi-verified' : 'semi-verified*';

    // Here you would typically send the data to your backend
    console.log('Registration data:', { 
      ...formData, 
      selfie: selfie ? 'provided' : 'not provided',
      verificationStatus 
    });
    
    // Store verification status in localStorage for later use
    localStorage.setItem('verificationStatus', verificationStatus);
    
    // Store username (combination of first and last name) for dashboard
    const username = `${formData.firstName} ${formData.lastName}`.toUpperCase();
    localStorage.setItem('username', username);
    
    // Store mobile number for login
    localStorage.setItem('userMobileNumber', formData.mobileNumber);
    localStorage.setItem('registeredMobileNumber', formData.mobileNumber);
    
    // Display status with red asterisk if applicable
    const displayStatus = selfie ? 'SEMI-VERIFIED' : 'SEMI-VERIFIED*';
    const message = `Registration submitted successfully! Status: ${displayStatus}`;
    
    // Create initial user profile for Profile page
    const initialProfile = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      phoneNumber: formData.mobileNumber,
      email: formData.email,
      address: '',
      city: '',
      province: '',
      maritalStatus: '',
      locationOfWork: '',
      businessType: '',
      sourceOfIncome: '',
      gameVenue: '',
    };
    localStorage.setItem('userProfile', JSON.stringify(initialProfile));
    
    if (selfie) {
      localStorage.setItem('selfieWithId', selfie);
    }
    
    alert(message);
    
    // Clear cache after successful submission
    clearCache();
    
    // Navigate to login or dashboard
    navigate('/login');
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      streamRef.current = stream;
      setShowCamera(true);
    } catch (error) {
      console.error('Camera error:', error);
      setCameraError('Unable to access camera. Please check permissions.');
    }
  };

  useEffect(() => {
    if (showCamera && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();
      };
    }
  }, [showCamera]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelfie(dataUrl);
        stopCamera();
      }
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-[90dvh] text-white flex flex-col font-sans">
      <div className="flex flex-col flex-1 w-full px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12 lg:px-16 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-6 md:mb-10 w-full">
          <button onClick={() => navigate('/login')} className="cursor-pointer absolute left-0 w-8 h-8 md:w-12 md:h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0 hover:bg-[#333] transition-colors">
            <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-white" />
          </button>
          <h1 
            className="text-center font-bold" 
            style={{ fontFamily: 'Bahnschrift, sans-serif', fontSize: 'clamp(18px, 3vw, 28px)' }}
          >
            Register
          </h1>
        </div>

        {/* Disclaimer */}
        <p 
          className="text-[#666] leading-relaxed mb-6 md:mb-10 text-center sm:text-justify max-w-[800px] mx-auto w-full"
          style={{ fontFamily: '"Aptos Narrow", sans-serif', fontSize: 'clamp(12px, 1.5vw, 16px)' }}
        >
          Make sure that all information are true and correct. Any false information will forfeit player privilege and automatically terminate or block player account use and access. Privacy Policy and Terms of Use will apply.
        </p>

        {/* Form - Uses CSS Grid on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 lg:gap-6 w-full max-w-[900px] mx-auto flex-1">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
          <input
            type="text"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={(e) => handleFieldChange('middleName', e.target.value)}
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={(e) => {
              const value = e.currentTarget.value.replace(/[^0-9]/g, '');
              handleFieldChange('mobileNumber', value);
            }}
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />

          {/* Birthdate */}
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM"
              maxLength={2}
              value={formData.birthMonth}
              onChange={(e) => {
                const value = e.currentTarget.value.replace(/[^0-9]/g, '');
                handleFieldChange('birthMonth', value);
              }}
              className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
              style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="DD"
              maxLength={2}
              value={formData.birthDay}
              onChange={(e) => {
                const value = e.currentTarget.value.replace(/[^0-9]/g, '');
                handleFieldChange('birthDay', value);
              }}
              className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
              style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="YYYY"
              maxLength={4}
              value={formData.birthYear}
              onChange={(e) => {
                const value = e.currentTarget.value.replace(/[^0-9]/g, '');
                handleFieldChange('birthYear', value);
              }}
              className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
              style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
            />
          </div>

          <input
            type="password"
            placeholder="Password 8 characters alphanumeric"
            value={formData.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />

          {/* Selfie Upload - Spans 2 columns on desktop */}
          <div 
            className="w-full md:col-span-2 h-32 md:h-48 lg:h-56 border border-[#333] rounded flex items-center justify-center relative overflow-hidden mt-2 md:mt-0 hover:border-[#666] transition-colors cursor-pointer"
            onClick={!selfie ? startCamera : undefined}
          >
            {selfie ? (
              <div className="w-full h-full relative">
                <img src={selfie} alt="Selfie" className="w-full h-full object-contain transform -scale-x-100 bg-black" />
                <button
                  onClick={(e) => { e.stopPropagation(); setSelfie(null); }}
                  className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <span
                className="text-[#666]"
                style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(12px, 1.5vw, 16px)' }}
              >
                Selfie with ID
              </span>
            )}
          </div>

          {/* Camera Modal */}
          {showCamera && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-black rounded-lg overflow-hidden max-w-2xl w-full flex flex-col border border-[#333]">
                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  {cameraError && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4">
                      <p className="text-red-500 text-center text-sm">{cameraError}</p>
                    </div>
                  )}
                </div>
                <div className="p-4 flex justify-center gap-4 bg-black">
                  <button
                    onClick={capturePhoto}
                    className="bg-[#1a1a1a] text-white px-8 py-3 rounded hover:bg-[#333] transition-colors"
                    style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 2vw, 18px)' }}
                  >
                    Capture
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition-colors"
                    style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 2vw, 18px)' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-4 mt-8 md:mt-12 mb-8 md:mb-12 w-full">
          <button 
            onClick={handleActivate}
            className="cursor-pointer bg-[#1a1a1a] text-white w-full max-w-[300px] md:max-w-[400px] py-4 rounded hover:bg-[#333] transition-colors"
            style={{ fontFamily: '"Bahnschrift SemiCondensed", Bahnschrift, sans-serif', fontSize: 'clamp(15px, 2vw, 20px)' }}
          >
            Activate
          </button>
          <button 
            onClick={clearCache}
            className="cursor-pointer text-[#666] text-xs hover:text-white transition-colors"
          >
            Clear Form Data
          </button>
        </div>

        {/* Footer */}
        {/* <Footer/> */}
        {/* <div className="flex justify-between items-center w-full pb-2 md:pb-4 border-t border-[#333] pt-4 md:pt-6 mt-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-white font-bold" style={{ fontSize: 'clamp(10px, 1.2vw, 14px)' }}>PINOYMGAME.PH</span>
            <span className="text-[#666]" style={{ fontSize: 'clamp(10px, 1.2vw, 14px)' }}>2026 v.1.0</span>
          </div>
          <span className="text-white font-bold uppercase shrink-0" style={{ fontSize: 'clamp(10px, 1.2vw, 14px)' }}>LICENSES</span>
        </div> */}
      </div>
    </div>
  );
}
