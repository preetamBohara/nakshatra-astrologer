"use client";

import React from 'react'
import { useTranslation } from "react-i18next";

const METRICS = [
  { labelKey: "totalVoiceCalls", fallbackLabel: "Total Voice Calls", value: "1", change: "+80.00%", icon: "phone" },
  { labelKey: "totalVideoCalls", fallbackLabel: "Total Video Calls", value: "0", change: "+0.00%", icon: "video" },
  { labelKey: "totalChats", fallbackLabel: "Total Chats", value: "0", change: "+0.00%", icon: "bubble" },
  { labelKey: "totalEarnings", fallbackLabel: "Total Earnings", value: "₹0", change: "+0.00%", icon: "rupee" },
  { labelKey: "totalDuration", fallbackLabel: "Total Duration", value: "0s", change: "+0.00%", icon: "clock" },
];





function MetricIcon({ name }) {
  const wrap = "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF0E5] p-1.5 text-primary";
  const inner = "block h-5 w-5 max-h-full max-w-full";
  if (name === "phone")
    return (
      <span className={wrap} aria-hidden>
        <svg className={inner} width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.4 21 3 14.6 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1l-2.3 2.9Z" />
        </svg>
      </span>
    );
  if (name === "video")
    return (
      <span className={wrap} aria-hidden>
        <svg className={inner} width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4Z" />
        </svg>
      </span>
    );
  if (name === "bubble")
    return (
      <span className={wrap} aria-hidden>
        <svg className={inner} width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
        </svg>
      </span>
    );
  if (name === "rupee")
    return (
      <span className={wrap} aria-hidden>
        <svg className={inner} width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 3h10v2H7V3Zm0 4h10v2H9.5c1.5 2 4 3.5 7 4v2c-3-.5-5.5-2-7-4v6h10v2H7v-6c0-2 1.5-3.5 3.5-4H7V7Z" />
        </svg>
      </span>
    );
  return (
    <span className={wrap} aria-hidden>
      <svg className={inner} width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8Zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7Z" />
      </svg>
    </span>
  );
}

const Performance = () => {
  const { t } = useTranslation();

  return (
    <>
        <section>
          <div className="flex flex-wrap gap-3 md:flex-nowrap md:justify-between">
            {METRICS.map((m) => (
              <div
                key={m.labelKey}
                className="flex min-w-35 flex-1 flex-col gap-2 rounded-2xl border border-[#EEE8F0] bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <MetricIcon name={m.icon} />
                  <span className="text-xs font-medium text-green-600">{m.change}</span>
                </div>
                <p className="text-xl font-semibold text-[#1a1a1a]">{m.value}</p>
                <p className="text-xs leading-snug text-[#666]">{t(m.labelKey) || m.fallbackLabel}</p>
              </div>
            ))}
          </div>
        </section>
    </>
  )
}

export default Performance