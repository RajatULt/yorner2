import React, { useState, useEffect } from 'react';
import { X, Shield, RefreshCw } from 'lucide-react';

interface OTPModalProps {
  isOpen: boolean;
  email: string;
  onVerify: (otp: string) => void;
  onClose: () => void;
  onResendOTP: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, email, onVerify, onClose, onResendOTP }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      onVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResend = () => {
    onResendOTP();
    setCountdown(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Shield className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Verify OTP</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">
            We've sent a 6-digit verification code to
          </p>
          <p className="font-medium text-gray-800">{email}</p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          ))}
        </div>

        {/* Resend OTP */}
        <div className="text-center mb-6">
          {canResend ? (
            <button
              onClick={handleResend}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mx-auto"
            >
              <RefreshCw size={16} />
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500 text-sm">
              Resend OTP in {countdown} seconds
            </p>
          )}
        </div>

        {/* Manual Verify Button */}
        <button
          onClick={() => onVerify(otp.join(''))}
          disabled={otp.join('').length !== 6}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors"
        >
          Verify & Continue
        </button>

        {/* Help Text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Demo: Use any 6-digit number (e.g., 123456)
        </p>
      </div>
    </div>
  );
};

export default OTPModal;