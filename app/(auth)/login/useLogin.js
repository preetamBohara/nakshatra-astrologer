"use client";

import { API_ENDPOINTS } from "@/constants/apiConstants";
import { postAPI } from "@/lib/apiServices";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

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
      const payload = { mobile: mobileNumber };
      const response = await postAPI(API_ENDPOINTS.LOGIN_WITH_MOBILE, payload);
      const responseData = response?.data;

      if (!responseData?.status) {
        throw new Error(responseData?.message || "Unable to send OTP. Please try again.");
      }

      const aidPayload = responseData?.data?.aid;
      const aid =
        (typeof aidPayload === "object" && aidPayload?.aid) ||
        (typeof aidPayload === "object" && aidPayload?._id) ||
        (typeof aidPayload === "string" ? aidPayload : "");
      const isNewAstrologer = Boolean(responseData?.data?.newAstrologer);

      localStorage.setItem("loginMobile", mobileNumber);
      if (aid) {
        localStorage.setItem("astrologerAid", aid);
      }
      localStorage.setItem("isNewAstrologer", String(isNewAstrologer));
      toast.success(responseData?.message || "OTP sent successfully");
      router.push("/otp");
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to send OTP. Please try again.";
      toast.error(serverMessage);
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
