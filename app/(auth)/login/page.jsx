"use client";

import Image from "next/image";
import { useLogin } from "./useLogin";

export default function Page() {
  const {
    mobileNumber,
    isSubmitting,
    isValidMobile,
    handleMobileChange,
    handleGoToSignup,
    handleGoToTerms,
    handleSubmit,
  } = useLogin();

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <form onSubmit={handleSubmit} className="flex h-full min-h-0 w-full flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-11 pb-6">
          <div className="mx-auto w-full max-w-md">
            <Image
              src="/assets/img/logo-gif.gif"
              alt="Nakshatra.ai logo"
              width={120}
              height={120}
              unoptimized
              className="mx-auto"
              priority
            />

            <div className="mt-8 text-center">
              <p className="text-base font-normal leading-6 text-[#4A4A4A]">
                Embark on your Astrology Journey with
              </p>
              <p className="mt-2 text-2xl font-semibold leading-tight text-[#222222]">
                Nakshatra.ai Astrologer
              </p>
            </div>

            <label htmlFor="mobile-number" className="mt-6 block">
              <span className="sr-only">Mobile Number</span>
              <div className="relative">
                <div className="flex items-center absolute top-1/2 -translate-y-1/2 left-4">
                  <span className="shrink-0 text-sm font-normal text-[#363636]">+91</span>
                  <span className="mx-3 h-6 w-px bg-[#DFDFDF]" aria-hidden />
                </div>
                <input
                  id="mobile-number"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="Enter Mobile Number"
                  value={mobileNumber}
                  onChange={handleMobileChange}
                  className=" w-full px-4 pl-17 text-sm text-[#202020] outline-none placeholder:text-[#B0B0B0] h-[50px] rounded-[14px] border border-[#BEC3C7] bg-white"
                />
              </div>
            </label>

            <p className="mt-4 text-sm font-normal text-[#3A3A3A]">
              Doesn't have a account?{" "}
              <button
                type="button"
                onClick={handleGoToSignup}
                className="font-semibold text-primary hover:opacity-90 cursor-pointer"
              >
                Signup
              </button>
            </p>
          </div>
        </div>

        <footer className="shrink-0 px-5 pb-5">
          <p className="mb-3 text-center text-xs font-normal text-[#606060]">
            By Submitting, you agree to our{" "}
            <button
              type="button"
              onClick={handleGoToTerms}
              className="font-medium underline underline-offset-2 text-primary cursor-pointer"
            >
              Terms & Conditions
            </button>
          </p>

          <button
            type="submit"
            disabled={!isValidMobile || isSubmitting}
            className="w-full rounded-lg bg-primary py-3.5 text-center text-base font-semibold text-white transition-opacity hover:opacity-95 active:opacity-90 disabled:cursor-not-allowed disabled:bg-[#E89886] disabled:opacity-100"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </footer>
      </form>
    </div>
  );
}