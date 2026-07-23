import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Reset() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100dvh] text-white flex flex-col font-sans">
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
            Reset
          </h1>
        </div>

        {/* Disclaimer */}
        <p
          className="text-[#666] leading-relaxed mb-6 md:mb-10 text-center sm:text-justify max-w-[800px] mx-auto w-full"
          style={{ fontFamily: '"Aptos Narrow", sans-serif', fontSize: 'clamp(12px, 1.5vw, 16px)' }}
        >
          Please make sure your mobile number is correct and active. A One-Time Password (OTP) will be sent to your mobile number to verify your account.
        </p>

        {/* Form section 1 */}
        <div className="flex flex-col gap-3 md:gap-5 w-full max-w-[800px] mx-auto">
          <input
            type="text"
            placeholder="Input your 11 digit number"
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mt-6 md:mt-10 mb-8 md:mb-12 w-full">
          <button
            className="cursor-pointer bg-[#1a1a1a] text-white w-full max-w-[300px] md:max-w-[400px] py-4 rounded hover:bg-[#333] transition-colors"
            style={{ fontFamily: '"Bahnschrift SemiCondensed", Bahnschrift, sans-serif', fontSize: 'clamp(15px, 2vw, 20px)' }}
          >
            Reset
          </button>
        </div>

        {/* OTP section */}
        <div className="flex flex-col gap-3 md:gap-5 mt-2 md:mt-6 w-full max-w-[800px] mx-auto">
          <input
            type="text"
            placeholder="Input your 6 digit OTP"
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6 md:mt-10 mb-8 md:mb-16 w-full">
          <button
            className="cursor-pointer bg-[#1a1a1a] text-white w-full max-w-[300px] md:max-w-[400px] py-4 rounded hover:bg-[#333] transition-colors"
            style={{ fontFamily: '"Bahnschrift SemiCondensed", Bahnschrift, sans-serif', fontSize: 'clamp(15px, 2vw, 20px)' }}
          >
            Submit
          </button>
        </div>

        {/* Footer */}
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
