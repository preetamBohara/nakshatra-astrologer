"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function CardIcon({ type }) {
  const wrapperClass = "inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary";

  if (type === "fingerprint") {
    return (
      <span className={wrapperClass} aria-hidden>
        <svg className="h-7 w-7" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3a7 7 0 0 0-7 7v1M12 3a7 7 0 0 1 7 7v1M5 10v1a7 7 0 0 0 14 0v-1M8 10v1a4 4 0 0 0 8 0v-1M12 7a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0v-1a3 3 0 0 0-3-3Zm0 10v4M8.5 14.5 6 20M15.5 14.5 18 20" />
        </svg>
      </span>
    );
  }

  if (type === "briefcase") {
    return (
      <span className={wrapperClass} aria-hidden>
        <svg className="h-7 w-7" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 8h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
          <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M12 12v3" />
        </svg>
      </span>
    );
  }

  return (
    <span className={wrapperClass} aria-hidden>
      <svg className="h-7 w-7" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9h18M5 9V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2M6 9v8M18 9v8M10 13v4M14 13v4M4 21h16" />
      </svg>
    </span>
  );
}

function VerifiedBadge() {
  const { t } = useTranslation();

  return (
    <span className="inline-flex h-9 items-center gap-1 rounded-full bg-[#E4F1E8] px-4 text-xs font-semibold text-[#2F8E49]">
      <svg className="h-4 w-4" width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2 4 6v6c0 5.2 3.4 9.9 8 11 4.6-1.1 8-5.8 8-11V6l-8-4Zm-1.3 14.2-3.2-3.2 1.4-1.4 1.8 1.8 4.4-4.4 1.4 1.4-5.8 5.8Z" />
      </svg>
      {t("approved") || "Verified"}
    </span>
  );
}

function BankDetailsModal({ isOpen, onClose, onSave, form, onChange }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label={t("close") || "Close bank details modal"}
        className="absolute inset-0 cursor-pointer bg-black/45"
      />

      <div className="relative z-10 flex h-[min(620px,80vh)] w-full max-w-[480px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E2E2E2] px-5 py-4">
          <h2 className="text-xl font-semibold text-[#2F2F2F]">{t("bankDetails") || "Bank Details"}</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#2E2E2E] hover:bg-[#F6F3F6]"
            aria-label={t("close") || "Close"}
          >
            <svg className="h-5 w-5" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m5 5 14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="account-holder-name" className="mb-1.5 block text-sm font-medium text-[#3A3A3A]">
                {t("accountHolderName") || "Account Holder Name"}
              </label>
              <input
                id="account-holder-name"
                type="text"
                value={form.holderName}
                onChange={(event) => onChange("holderName", event.target.value)}
                className="h-[46px] w-full rounded-xl border border-[#BBBBBB] px-3.5 text-sm uppercase text-[#333] outline-none"
              />
            </div>

            <div>
              <label htmlFor="account-number" className="mb-1.5 block text-sm font-medium text-[#3A3A3A]">
                {t("accountNumber") || "Account Number"}
              </label>
              <input
                id="account-number"
                type="text"
                inputMode="numeric"
                value={form.accountNumber}
                onChange={(event) => onChange("accountNumber", event.target.value.replace(/\D/g, ""))}
                className="h-[46px] w-full rounded-xl border border-[#BBBBBB] px-3.5 text-sm text-[#333] outline-none"
              />
            </div>

            <div>
              <label htmlFor="ifsc-code" className="mb-1.5 block text-sm font-medium text-[#3A3A3A]">
                {t("ifscCode") || "IFSC Code"}
              </label>
              <input
                id="ifsc-code"
                type="text"
                value={form.ifsc}
                onChange={(event) => onChange("ifsc", event.target.value.toUpperCase())}
                className="h-[46px] w-full rounded-xl border border-[#BBBBBB] px-3.5 text-sm uppercase text-[#333] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#E2E2E2] px-5 py-4">
          <button
            type="button"
            onClick={onSave}
            className="h-[44px] w-full cursor-pointer rounded-xl bg-[#E5623F] text-sm font-semibold text-white hover:opacity-95"
          >
            {t("save") || "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function KycDetailsPage() {
  const { t } = useTranslation();
  const profile = useSelector((state) => state.dashboard.profile.data);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [bankForm, setBankForm] = useState({ holderName: "", accountNumber: "", ifsc: "" });

  const documents = profile?.documents || {};
  const aadharDoc = documents?.aadharCard;
  const panDoc = documents?.panCard;
  const bankDetails = profile?.bankDetails;

  const maskAadhar = (value) => {
    const digits = String(value || "").replace(/\D/g, "");
    if (!digits) return "XXXX  XXXX  XXXX";
    return `XXXX  XXXX  ${digits.slice(-4)}`;
  };

  const maskPan = (value) => {
    const pan = String(value || "").toUpperCase();
    if (!pan) return "ABCDE  1234  F";
    return `${pan.slice(0, 5)}  ${pan.slice(5, 9)}  ${pan.slice(9, 10)}`.trim();
  };

  const bankLabel = (() => {
    const bankName = bankDetails?.bankName || bankDetails?.bank || "Bank";
    const accountNumber = String(bankDetails?.accountNumber || bankDetails?.accountNo || "");
    const maskedNumber = accountNumber ? `â€¢ â€¢ â€¢ â€¢ ${accountNumber.slice(-4)}` : "â€¢ â€¢ â€¢ â€¢";
    return `${bankName} ${maskedNumber}`.trim();
  })();

  const verifiedItems = [
    {
      id: "aadhar",
      title: "Aadhar card number",
      value: maskAadhar(aadharDoc?.aadharNumber || aadharDoc),
      icon: "fingerprint",
      isAvailable: Boolean(aadharDoc),
    },
    {
      id: "pan",
      title: "Pan card number",
      value: maskPan(panDoc?.panNumber || panDoc),
      icon: "briefcase",
      isAvailable: Boolean(panDoc),
    },
    {
      id: "bank",
      title: "Bank account",
      value: bankLabel,
      icon: "bank",
      isAvailable: Boolean(bankDetails && (bankDetails?.accountNumber || bankDetails?.accountNo || bankDetails?.ifscCode)),
    },
  ];

  const hasBankDetails = verifiedItems.find((item) => item.id === "bank")?.isAvailable;

  const detailPanelContent = hasBankDetails
    ? {
        title: "Need to update your bank details?",
        description: "Keep your account information accurate to ensure smooth payouts and uninterrupted verification status.",
        buttonLabel: `${t("update") || "Update"} ${t("bankDetails") || "Bank Details"}`,
      }
    : {
        title: "Need to add your bank details?",
        description: "Add your bank account information to receive payouts securely and complete your verification profile.",
        buttonLabel: `${t("add") || "Add"} ${t("bankDetails") || "Bank Details"}`,
      };
  const activeCount = verifiedItems.filter((item) => item.isAvailable).length;

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-[#2B2B2B]">{t("kycDetails") || "KYC Details"}</h1>
        <span className="inline-flex rounded-full bg-[#F2EFEE] px-3 py-1 text-[11px] font-semibold tracking-wide text-[#767676]">
          {`${activeCount} ${t("approved") || "ACTIVE"}`}
        </span>
      </div>
      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-7">
          <div className="flex flex-col gap-3">
            {verifiedItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#EFE7EE] bg-white p-4 shadow-sm">
                <div className="flex min-w-0 items-center gap-4">
                  <CardIcon type={item.icon} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold leading-tight text-[#373737]">{t(item.id === "aadhar" ? "aadharCardNumber" : item.id === "pan" ? "panCardNumber" : "bankAccount") || item.title}</p>
                    <p className="mt-1 truncate text-sm text-[#666]">{item.value}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <VerifiedBadge />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <div className=" rounded-xl border-2 border-dashed border-[#E4DFE7] bg-white p-6">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary-light text-primary shadow-sm">
                <svg className="h-6 w-6" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" />
                  <path d="M14 3v6h6M12 17v-6M9.5 13.5 12 11l2.5 2.5" />
                </svg>
              </span>

              <h2 className="mt-6 text-xl font-semibold leading-tight text-[#35353B]">{detailPanelContent.title}</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#777785]">
                {detailPanelContent.description}
              </p>

              <button
                type="button"
                onClick={() => {
                  setBankForm({
                    holderName: bankDetails?.accountHolderName || bankDetails?.holderName || "",
                    accountNumber: String(bankDetails?.accountNumber || bankDetails?.accountNo || ""),
                    ifsc: bankDetails?.ifscCode || "",
                  });
                  setIsBankModalOpen(true);
                }}
                className="mt-7 inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(209,0,90,0.2)] hover:opacity-95"
              >
                {detailPanelContent.buttonLabel}
              </button>
            </div>
          </div>
        </div>

        <BankDetailsModal
          isOpen={isBankModalOpen}
          onClose={() => setIsBankModalOpen(false)}
          onSave={() => setIsBankModalOpen(false)}
          form={bankForm}
          onChange={(key, value) => setBankForm((prev) => ({ ...prev, [key]: value }))}
        />
      </section>
    </>
  );
}

