import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/ModalContext";

export default function LoginCard() {
  const [agree, setAgree] = useState(false);
  const [username, setUsername] = useState(() => localStorage.getItem("cachedMobileNumber") || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { showModal } = useModal();

  // Cache mobile number on change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    localStorage.setItem("cachedMobileNumber", value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Validate fields
    if (!username || !password) {
      let message;
      let title;

      if (!username && !password) {
        message = "Please enter your username and password.";
        title = "Missing Required Fields";
      } else if (!username) {
        message = "Please enter your username.";
        title = "Missing Username";
      } else {
        message = "Please enter your password.";
        title = "Missing Password";
      }

      showModal(
        "warning",
        title,
        message,
      );

      return;
    }

    if (!agree) {
      showModal(
        "warning",
        "Agreement Required",
        "Please accept the Privacy Policy and Terms of Use.",
      );

      return;
    }

    // Validate against registered mobile number
    const registeredMobileNumber = localStorage.getItem('registeredMobileNumber');
    if (registeredMobileNumber && username !== registeredMobileNumber) {
      alert('Mobile number does not match registered account');
      return;
    }

    // Here you would typically authenticate with your backend
    console.log('Login attempt:', { username });

    // Store user mobile number to establish session
    localStorage.setItem('userMobileNumber', username);

    // Store registered mobile number if not present (simulating successful login for new device)
    if (!registeredMobileNumber) {
      localStorage.setItem('registeredMobileNumber', username);
    }

    // Set a generic username if not registered
    if (!localStorage.getItem('username')) {
      localStorage.setItem('username', 'Player');
    }

    // Set default verification status if not already set
    if (!localStorage.getItem('verificationStatus')) {
      localStorage.setItem('verificationStatus', 'fully-verified');
    }

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[90dvh] text-white font-sans">
      <div className="flex min-h-[90dvh] flex-col w-full max-w-[1200px] mx-auto px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12 lg:px-16">
        {/* Centered Login Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h1
            className="text-center font-bold mb-10"
            style={{
              fontFamily: "Bahnschrift, sans-serif",
              fontSize: "clamp(18px, 3vw, 28px)",
            }}
          >
            MGame
          </h1>
          <div className="pb-6">
            <p
              className="text-[#666] leading-relaxed text-justify"
              style={{
                fontFamily: '"Aptos Narrow", sans-serif',
                fontSize: "clamp(12px, 1.5vw, 16px)",
              }}
            >
              MGame.ph is an online gaming platform for players aged 21 and above only.
              You may register and play only if you are not a government official or employee,
              a member of the armed forces, a Gaming Employment License (GEL) holder,
              or listed in PAGCOR's National Database of Restricted Persons (NDRP).
              If you are found ineligible, your account, funds, and credits may be forfeited in accordance with applicable regulations.
              Please play responsibly and avoid playing in public places. By continuing,
              you confirm that you meet the eligibility requirements and agree to MGame.ph's {" "}
              <span className="text-red-600 font-semibold">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="text-red-600 font-semibold">
                Terms of Use.
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Mobile Number"
              value={username}
              onChange={handleUsernameChange}
              className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:italic placeholder:tracking-[8px] outline-none focus:border-white transition-colors"
              style={{
                fontFamily: '"Calibri Light", Calibri, sans-serif',
                fontSize: "clamp(14px, 1.5vw, 18px)",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:italic placeholder:tracking-[8px] outline-none focus:border-white transition-colors"
              style={{
                fontFamily: '"Calibri Light", Calibri, sans-serif',
                fontSize: "clamp(14px, 1.5vw, 18px)",
              }}
            />
          </div>

          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <div
              onClick={() => setAgree(!agree)}
              className="w-7 h-7 border border-[#333] flex items-center justify-center text-sm font-bold"
            >
              {agree && "✕"}
            </div>

            <span className="text-xs">I agree to MGame's <span className="text-red-600">Privacy Policy</span>   &amp;<span className="text-red-600"> Terms of Use.</span> </span>
          </label>

          <button
            onClick={handleLogin}
            className="mx-auto mt-6 bg-[#222] hover:bg-[#333] transition-colors cursor-pointer px-16 py-2 text-lg font-bold"
          >
            LOGIN
          </button>

          <div className="flex justify-between mt-15 text-lg font-bold">
            <button
              className="cursor-pointer"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </button>

            <button
              className="cursor-pointer"
              onClick={() => navigate("/reset")}
            >
              RESET
            </button>
          </div>

        </div>

        {/* Disclaimer */}

      </div>
    </div>
  );
}