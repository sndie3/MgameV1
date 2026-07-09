import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useModal } from '../../../context/ModalContext';

interface ChangePasswordViewProps {
  onBack: () => void;
}

export default function ChangePasswordView({ onBack }: ChangePasswordViewProps) {
  const { showModal } = useModal();
  const [otp, setOtp] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isOtpComplete = otp.length === 6;
  const isNumberComplete = mobileNumber.length === 11;
  const isNewPasswordEntered = newPassword.length > 0;

  const handleConfirm = () => {
    if (!otp || !mobileNumber || !newPassword || !confirmPassword) {
      showModal('warning', 'Missing Fields', 'Please fill in all required fields.');
      return;
    }

    if (otp.length !== 6) {
      showModal('warning', 'Invalid OTP', 'Please enter a valid 6 digit OTP.');
      return;
    }

    if (mobileNumber.length !== 11) {
      showModal('warning', 'Invalid Mobile Number', 'Please enter an 11 digit mobile number.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showModal('warning', 'Password Mismatch', 'New password and confirm password do not match.');
      return;
    }

    showModal('success', 'Password Changed', 'Your password has been changed successfully.');
    setOtp('');
    setMobileNumber('');
    setNewPassword('');
    setConfirmPassword('');
    onBack();
  };

  return (
    <div className="min-h-screen text-white flex flex-col bg-[var(--background-color)]">
      <div className="flex flex-col flex-1 w-full px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12 lg:px-16 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-6 md:mb-10 w-full">
          <button
            onClick={onBack}
            className="cursor-pointer absolute left-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 transition-colors"
            style={{ backgroundColor: 'var(--button-color, #1a1a1a)' }}
          >
            <ArrowLeft className="w-5 h-5 md:w-7 md:h-7 text-white" />
          </button>
          <h1
            className="text-center font-bold"
            style={{ fontFamily: 'Bahnschrift, sans-serif', fontSize: 'clamp(18px, 3vw, 28px)' }}
          >
            Change Password
          </h1>
        </div>

        {/* Disclaimer */}
        <p
          className="text-[#666] leading-relaxed mb-6 md:mb-10 text-left max-w-[800px] mx-auto w-full"
          style={{ fontFamily: '"Aptos Narrow", sans-serif', fontSize: 'clamp(12px, 1.5vw, 16px)' }}
        >
          Make sure that the number is correct and order and also a OTP will be send to your email account for a verification process.
        </p>

        {/* Form */}
        <div className="flex flex-col gap-3 md:gap-5 w-full max-w-[800px] mx-auto">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Input your 6 digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.currentTarget.value.replace(/[^0-9]/g, ''))}
            className="w-full bg-[#121212] border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
          <input
            type="text"
            inputMode="numeric"
            maxLength={11}
            placeholder="Input your 11 digit number"
            value={mobileNumber}
            disabled={!isOtpComplete}
            onChange={(e) => setMobileNumber(e.currentTarget.value.replace(/[^0-9]/g, ''))}
            className="w-full bg-[#121212] border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            disabled={!isNumberComplete}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-[#121212] border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            disabled={!isNewPasswordEntered}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-[#121212] border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: '"Calibri Light", Calibri, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          />
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center mt-8 md:mt-12 mb-8 md:mb-12 w-full">
          <button
            onClick={handleConfirm}
            disabled={!isOtpComplete || !isNumberComplete || !newPassword || !confirmPassword}
            className="cursor-pointer text-white w-full max-w-[300px] md:max-w-[400px] py-4 rounded hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: '"Bahnschrift SemiCondensed", Bahnschrift, sans-serif', fontSize: 'clamp(15px, 2vw, 20px)', backgroundColor: 'var(--button-color, #1a1a1a)' }}
          >
            Confirm
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-center w-full pb-2 md:pb-4 border-t border-[#333] pt-4 md:pt-6 bg-[#121212] rounded">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-white font-bold" style={{ fontSize: 'clamp(10px, 1.2vw, 14px)' }}>
              RESET
            </span>
            <span className="text-[#666]" style={{ fontSize: 'clamp(10px, 1.2vw, 14px)' }}>
              All Rights Reserved 2026
            </span>
          </div>
          <span className="text-white font-bold uppercase shrink-0" style={{ fontSize: 'clamp(10px, 1.2vw, 14px)' }}>
            Policies
          </span>
        </div>
      </div>
    </div>
  );
}
