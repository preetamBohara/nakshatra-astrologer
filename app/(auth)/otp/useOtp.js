"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const OTP_LENGTH = 6;
const RESEND_WAIT_SECONDS = 30;

function getInitialOtp() {
  return Array.from({ length: OTP_LENGTH }, () => "");
}

export function useOtp() {
  const router = useRouter();
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(getInitialOtp);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(RESEND_WAIT_SECONDS);

  const phoneNumber = "+91 9090909909";

  useEffect(() => {
    const timer = setInterval(() => {
      setResendSeconds((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const canSubmit = useMemo(() => otp.every((digit) => digit !== ""), [otp]);

  function setOtpValue(index, value) {
    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function focusInput(index) {
    inputRefs.current[index]?.focus();
  }

  function handleOtpChange(index, event) {
    const raw = event.target.value;
    const digit = raw.replace(/\D/g, "").slice(-1);
    setOtpValue(index, digit);
    if (digit && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  }

  function handleOtpKeyDown(index, event) {
    if (event.key === "Backspace") {
      if (otp[index]) {
        setOtpValue(index, "");
        return;
      }
      if (index > 0) {
        focusInput(index - 1);
      }
    }
  }

  function handleOtpPaste(event) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    setOtp((prev) => {
      const next = [...prev];
      for (let i = 0; i < OTP_LENGTH; i += 1) {
        next[i] = pasted[i] ?? "";
      }
      return next;
    });

    const nextFocusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    focusInput(nextFocusIndex);
  }

  function handleEditPhone() {
    router.push("/login");
  }

  function handleBack() {
    router.push("/login");
  }

  function handleResendOtp() {
    if (resendSeconds > 0) return;
    setResendSeconds(RESEND_WAIT_SECONDS);
    setOtp(getInitialOtp());
    focusInput(0);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Placeholder for OTP verification API.
      await new Promise((resolve) => setTimeout(resolve, 250));
      router.push("/choose-language");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    otp,
    canSubmit,
    isSubmitting,
    resendSeconds,
    phoneNumber,
    inputRefs,
    handleBack,
    handleEditPhone,
    handleResendOtp,
    handleSubmit,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
  };
}
