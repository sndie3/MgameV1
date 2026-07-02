import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [selfie, setSelfie] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setSelfie(url);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-black text-white flex flex-col font-sans">
      <div className="flex flex-col flex-1 w-full px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12 lg:px-16 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-6 md:mb-10 w-full">
          <button onClick={() => navigate('/login')} className="absolute left-0 w-8 h-8 md:w-12 md:h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0 hover:bg-[#333] transition-colors">
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
          {[
            { placeholder: 'First Name', type: 'text' },
            { placeholder: 'Middle Name', type: 'text' },
            { placeholder: 'Last Name', type: 'text' },
            { placeholder: 'Mobile Number', type: 'tel' },
          ].map((field, idx) => (
            <input
              key={idx}
              type={field.type}
              placeholder={field.placeholder}
              className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
              style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
            />
          ))}

          {/* Birthdate */}
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            <input
              type="text"
              placeholder="MM"
              maxLength={2}
              className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
              style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
            />
            <input
              type="text"
              placeholder="DD"
              maxLength={2}
              className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
              style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
            />
            <input
              type="text"
              placeholder="YY"
              maxLength={2}
              className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
              style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
            />
          </div>

          <input
            type="password"
            placeholder="Password 8 characters alphanumeric"
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />

          {/* Selfie Upload - Spans 2 columns on desktop */}
          <label 
            className="w-full md:col-span-2 h-32 md:h-48 lg:h-56 border border-[#333] rounded flex items-center justify-center cursor-pointer relative overflow-hidden mt-2 md:mt-0 hover:border-[#666] transition-colors"
          >
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
            {selfie ? (
              <img src={selfie} alt="Selfie" className="w-full h-full object-cover" />
            ) : (
              <span 
                className="text-[#666]"
                style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(12px, 1.5vw, 16px)' }}
              >
                Selfie with ID
              </span>
            )}
          </label>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-8 md:mt-12 mb-8 md:mb-12 w-full">
          <button 
            className="bg-[#1a1a1a] text-white w-full max-w-[300px] md:max-w-[400px] py-4 rounded hover:bg-[#333] transition-colors"
            style={{ fontFamily: '"Bahnschrift SemiCondensed", Bahnschrift, sans-serif', fontSize: 'clamp(15px, 2vw, 20px)' }}
          >
            Activate
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center w-full pb-2 md:pb-4 border-t border-[#333] pt-4 md:pt-6 mt-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-white font-bold" style={{ fontSize: 'clamp(10px, 1.2vw, 14px)' }}>PINOYMGAME.PH</span>
            <span className="text-[#666]" style={{ fontSize: 'clamp(10px, 1.2vw, 14px)' }}>2026 v.1.0</span>
          </div>
          <span className="text-white font-bold uppercase shrink-0" style={{ fontSize: 'clamp(10px, 1.2vw, 14px)' }}>LICENSES</span>
        </div>
      </div>
    </div>
  );
}
