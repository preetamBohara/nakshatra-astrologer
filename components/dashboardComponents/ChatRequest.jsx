"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import EmptyState from "@/components/common/EmptyState";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingChatRequests } from "@/redux/slices/dashboardSlice";
import { getBackendImageUrl } from "@/lib/getBackendImageUrl";

function ChatEmptyIcon() {
  return (
    <svg className="h-5 w-5" width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

function formatTime(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  const now = Date.now();
  const diffMs = Math.max(0, now - date.getTime());
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diffMs < minute) return "just now";
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} min ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} hours ago`;
  return `${Math.floor(diffMs / day)} days ago`;
}

const ChatRequest = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pendingState = useSelector((state) => state.dashboard.pendingChatRequests);
  const isLoading = pendingState.loading;
  const error = pendingState.error;
  const list = Array.isArray(pendingState.data) ? pendingState.data : [];

  useEffect(() => {
    if (pendingState.loading || pendingState.loaded) return;
    void dispatch(fetchPendingChatRequests());
  }, [dispatch, pendingState.loaded, pendingState.loading]);

  return (
    <section className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-[#1a1a1a]">{t("chatRequests") || "Chat Requests"}</h2>
      {isLoading ? <p className="text-sm text-[#7A7A7A]">Loading chat requests...</p> : null}
      {error ? <p className="mb-3 text-sm text-[#B42318]">{error}</p> : null}
      {!isLoading && !error && list.length === 0 ? (
        <EmptyState
          title={t("noRequestAvailable") || "No chat requests yet"}
          text={t("noRequestsYet") || "You will see incoming chat requests here when users connect with you."}
          icon={<ChatEmptyIcon />}
        />
      ) : null}
      {!isLoading && !error && list.length > 0 ? (
        <div className="space-y-3">
          {list.map((item, index) => {
            const user = item?.user || {};
            const userProfile = item?.userProfile || {};
            const name = user?.name || userProfile?.name || "User";
            const mobile = user?.mobile || "-";
            const imageUrl = getBackendImageUrl(user?.image || userProfile?.image);
            const timeText = formatTime(item?.createdAt || item?.timestamp);
            const id = item?._id || item?.id || `chat-req-${index}`;
            return (
              <article key={id} className="flex items-center justify-between gap-3 rounded-xl border border-[#EEE8F0] bg-[#FCFBFD] px-3 py-2.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#E8E0ED] bg-[#F7F4FA]">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={name} width={40} height={40} unoptimized className="h-full w-full object-cover" />
                    ) : (
                      <span className="m-auto text-xs font-semibold text-[#7A6A86]">{name.slice(0, 1).toUpperCase()}</span>
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#1a1a1a]">{name}</p>
                    <p className="truncate text-xs text-[#7A7A7A]">{timeText}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                  >
                    Accept
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
};

export default ChatRequest;