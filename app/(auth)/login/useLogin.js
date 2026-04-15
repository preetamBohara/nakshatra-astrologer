"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export function useLogin() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleMobileChange(event) {
    const onlyDigits = event.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(onlyDigits);
  }

  const isValidMobile = useMemo(() => mobileNumber.length === 10, [mobileNumber]);

  function handleGoToSignup() {
    router.push("/signup");
  }

  function handleGoToTerms() {
    // Keep this ready for terms page route when available.
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isValidMobile || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Placeholder for login API integration.
      await new Promise((resolve) => setTimeout(resolve, 250));
      router.push("/choose-language");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    mobileNumber,
    isSubmitting,
    isValidMobile,
    handleMobileChange,
    handleGoToSignup,
    handleGoToTerms,
    handleSubmit,
  };
}
