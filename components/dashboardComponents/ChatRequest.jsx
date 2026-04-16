"use client";

import React from 'react'
import EmptyState from '@/components/common/EmptyState'
import { useTranslation } from "react-i18next";

function ChatEmptyIcon() {
  return (
    <svg className="h-5 w-5" width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
    </svg>
  )
}

const ChatRequest = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-[#1a1a1a]">{t("chatRequests") || "Chat Requests"}</h2>
        <EmptyState
          title={t("noRequestAvailable") || "No chat requests yet"}
          text={t("noRequestsYet") || "You will see incoming chat requests here when users connect with you."}
          icon={<ChatEmptyIcon />}
        />
      </section>
    </>
  )
}

export default ChatRequest