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

const Header = () => {
  return (
    <>
      <header className="flex shrink-0 items-center justify-between border-b border-[#E8E4EC] bg-white px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            N
          </span>
          <span className="text-sm font-semibold text-[#1a1a1a] md:text-base">Nakshatra.ai Astrologer</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white">₹ 2</div>
          <button type="button" className="rounded-full p-2 text-[#5C5C5C] hover:bg-[#F5F5F5]" aria-label="Notifications">
            <NavIcon name="bell" />
          </button>
        </div>
      </header>
    </>
  )
}

export default Header