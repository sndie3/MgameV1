import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const [agree, setAgree] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-[90dvh] bg-black text-white flex flex-col font-sans">
      <div className="flex flex-col flex-1 w-full px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12 lg:px-16 max-w-[1200px] mx-auto">
        <h1
          className="text-center font-bold mb-10"
          style={{ fontFamily: 'Bahnschrift, sans-serif', fontSize: 'clamp(18px, 3vw, 28px)' }}
        >
          PinoyMGame
        </h1>

        <div className="space-y-2">
          {/* <input
            type="text"
            placeholder="Username"
            className="w-full h-15 border border-gray-300 bg-transparent text-center placeholder:italic placeholder:tracking-[8px] outline-none"
          /> */}
          {/* <input
            type="password"
            placeholder="Password"
            className="w-full h-15 border border-gray-300 bg-transparent text-center placeholder:italic placeholder:tracking-[8px] outline-none"
          /> */}
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:italic placeholder:tracking-[8px] outline-none focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:italic placeholder:tracking-[8px] outline-none focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />

        </div>

        <label className="flex items-center gap-2 mt-2 cursor-pointer">
          <div
            onClick={() => setAgree(!agree)}
            className="w-7 h-7 border border-white flex items-center justify-center text-sm font-bold"
          >
            {agree && "✕"}
          </div>

          <span className="text-xs">
            Terms & Conditions apply.
          </span>
        </label>

        <button className="flex py-2 px-15 mx-auto justify-center bg-[#222] hover:bg-[#333] text-lg font-bold my-5">
          LOGIN
        </button>

        <div className="flex justify-between mt-5 text-lg font-bold">
          <button onClick={() => navigate('/register')}>REGISTER</button>
          <button onClick={() => navigate('/reset')}>RESET</button>
        </div>

        <p
          className="text-[#666] leading-relaxed mb-6 md:mb-10  sm:text-justify w-full"
          style={{ fontFamily: '"Aptos Narrow", sans-serif', fontSize: 'clamp(12px, 1.5vw, 16px)' }}
        >
          This site is for 21 years and above only, not allowed to any
          government official or employee connected with any government agency
          or armed forces, not allowed to any Gaming Employment License (GEL)
          holder, not allowed to any PAGCOR's National Database of Restricted
          Persons (NDRP), also that your Funds or credits in my account may be
          forfeited if found ineligible, you are refrain from playing in public,
          and I agree to MGAME's{" "}
          <span className="text-red-600 font-semibold">
            Privacy Policy
          </span>{" "}
          and{" "}
          <span className="text-red-600 font-semibold">
            Terms of Use.
          </span>
        </p>
      </div>
    </div>
  );
}