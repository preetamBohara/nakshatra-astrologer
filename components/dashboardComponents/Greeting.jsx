"use client";

import React from 'react'
import { useTranslation } from "react-i18next";

const Greeting = () => {
  const { t } = useTranslation();

  return (
    <>
          <section className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-stretch md:justify-between md:p-5">
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div>
                <h1 className="text-lg font-semibold text-[#1a1a1a] md:text-xl">{`${t("goodMorning") || "Good morning,"} Girish sharma`}</h1>
                <p className="text-sm text-[#666]">Thu, 17 Apr 2026</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-[#444]">{t("offline") || "Offline"}</span>
                  <button
                    type="button"
                    className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full bg-[#D4D4D4] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow"
                    aria-pressed="false"
                    aria-label="Toggle online status"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-6 border-t border-[#F0ECF4] pt-4">
                <div>
                  <p className="text-xs text-[#888]">{t("earnings") || "Earnings"}</p>
                  <p className="text-lg font-semibold text-[#1a1a1a]">₹0</p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">{t("duration") || "Duration"}</p>
                  <p className="text-lg font-semibold text-[#1a1a1a]">0s</p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">{t("consultations") || "Consultations"}</p>
                  <p className="text-lg font-semibold text-[#1a1a1a]">0</p>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 md:flex-row md:gap-3">
              {[t("chat") || "Chat", t("voiceCalls") || "Voice Calls", t("videoCalls") || "Video Calls"].map((title) => (
                <div
                  key={title}
                  className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl border border-[#EEE8F0] bg-[#FDFBFF] p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#333]">{title}</span>
                    <button
                      type="button"
                      className="relative h-5 w-9 shrink-0 cursor-pointer rounded-full bg-[#D4D4D4] after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white"
                      aria-label={`Toggle ${title}`}
                    />
                  </div>
                  <p className="text-xs text-[#888]">{`${t("sessions") || "Sessions"}: 0`}</p>
                  <p className="text-sm font-semibold text-primary">₹0</p>
                </div>
              ))}
            </div>
          </section>
    </>
  )
}

export default Greeting