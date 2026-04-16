"use client";

import React from 'react'
import { useTranslation } from "react-i18next";

const Earnings = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-[#1a1a1a]">{t("earnings") || "Earnings"}</h2>
          <div className="flex items-center gap-2 text-sm text-[#555]">
            <button type="button" className="cursor-pointer p-1" aria-label="Previous week">
              ‹
            </button>
            <span>13 Apr - 19 Apr</span>
            <button type="button" className="cursor-pointer p-1" aria-label="Next week">
              ›
            </button>
            <button type="button" className="ml-1 cursor-pointer rounded-lg border border-[#E0DCE4] p-2" aria-label="Open calendar">
              <svg className="h-4 w-4" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 11h18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-[#E0DCE4] bg-[#FAFAFC] text-sm text-[#888]">
          {t("chartAreaPlaceholder") || "Chart area placeholder"}
        </div>
      </section>
    </>
  )
}

export default Earnings