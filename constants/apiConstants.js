const API_FALLBACK_URL = "https://astrologer.nakshatraai.ai";

export const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || API_FALLBACK_URL).replace(/\/$/, "");

export const API_ENDPOINTS = {
  LOGIN_WITH_MOBILE: "/api/astrologer/loginwithmobile",
  VERIFY_OTP: "/api/astrologer/verifyotp",
  RESEND_OTP: "/api/astrologer/resendotp",
  REGISTRATION_SEND_OTP: "/api/astrologer/registration-send-otp",
  REGISTRATION_VERIFY_OTP: "/api/astrologer/registration-verify-otp",
  REGISTER: "/api/astrologer/register",
  GET_LISTING: "/api/astrologer/get-listing",
};