import { useState } from "react";

export default function LoginCard() {
  const [agree, setAgree] = useState(true);

  return (
      <div className="text-white flex-col rounded-md font-sans pt-5 overflow-y-auto">
        <h1 className="text-center text-xl font-bold mb-16">
          PinoyMGame
        </h1>

        

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Username"
            className="w-full h-15 border border-gray-300 bg-transparent text-center placeholder:italic placeholder:tracking-[8px] outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-15 border border-gray-300 bg-transparent text-center placeholder:italic placeholder:tracking-[8px] outline-none"
          />
        </div>

        <label className="flex items-center gap-2 mt-2 cursor-pointer">
          <div
            onClick={() => setAgree(!agree)}
            className="w-7 h-7 border border-white flex items-center justify-center text-sm font-bold"
          >
            {agree && "✕"}
          </div>

          <span className="text-sm">
            Terms & Conditions apply.
          </span>
        </label>

        <button className="flex py-2 px-15 mx-auto justify-center bg-[#222] hover:bg-[#333] text-lg font-bold my-5">
          LOGIN
        </button>

        <div className="flex justify-between mt-5 text-lg font-bold">
          <button>REGISTER</button>
          <button>RESET</button>
        </div>

        <p className="text-gray-600 mt-5 leading-relaxed text-sm">
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
  );
}