<<<<<<< HEAD
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function NavIcon({ name }) {
  const common = "h-5 w-5 shrink-0 text-[#6A6A6A]";
  switch (name) {
    case "bell":
      return (
        <svg className={common} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M6.8 9a5.2 5.2 0 1 1 10.4 0v4.2l1.7 2.3a.9.9 0 0 1-.7 1.5H5.8a.9.9 0 0 1-.7-1.5l1.7-2.3V9Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    default:
      return null;
  }
}

const Header = ({ onMenuClick }) => {
  const profile = useSelector((state) => state.dashboard.profile.data);
  const rawBalance = profile?.balance ?? profile?.walletAmount ?? profile?.wallet?.amount ?? profile?.totalBalance ?? 2;
  const balanceValue = Number(rawBalance || 0).toFixed(2);

  return (
    <>
      <header className="flex shrink-0 items-center justify-between border-b border-[#E8E4EC] bg-white px-3 py-3 md:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#E8E4EC] text-[#444] lg:hidden"
            aria-label="Open sidebar"
          >
            <svg className="h-5 w-5" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#E4DDE6] bg-white">
            <Image src="/assets/img/logo-gif.gif" alt="Nakshatra.ai logo" width={36} height={36} unoptimized className="h-full w-full object-cover" />
          </span>
          <p className="truncate text-[18px] font-semibold text-[#1F1F1F]">
            Nakshatra.ai <span className="font-normal text-[#8A8A8A]">Astrologer</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5">
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-white">{`\u20B9${balanceValue}`}</span>
            <span className="ml-2 text-[11px] font-semibold tracking-[0.08em] text-primary">TOTAL BALANCE</span>
          </div>

          <Link href="/notifications" className="relative cursor-pointer rounded-full p-2 text-[#5C5C5C] hover:bg-[#F5F5F5]" aria-label="Notifications">
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#D1005A]" />
            <NavIcon name="bell" />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
=======
import React from 'react'

function NavIcon({ name }) {
  const common = "h-5 w-5 shrink-0 text-[#5C5C5C]";
  switch (name) {
    case "bell":
      return (
        <svg className={common} width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" />
        </svg>
      );
    default:
      return null;
  }
}

const Header = ({ onMenuClick }) => {
  return (
    <>
      <header className="flex shrink-0 items-center justify-between border-b border-[#E8E4EC] bg-white px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#E8E4EC] text-[#444] lg:hidden"
            aria-label="Open sidebar"
          >
            <svg className="h-5 w-5" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            N
          </span>
          <span className="text-sm font-semibold text-[#1a1a1a] md:text-base">Nakshatra.ai Astrologer</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white">₹ 2</div>
          <button type="button" className="cursor-pointer rounded-full p-2 text-[#5C5C5C] hover:bg-[#F5F5F5]" aria-label="Notifications">
            <NavIcon name="bell" />
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
>>>>>>> 2f614ca440eee91178a05d50113f8481184eecff
