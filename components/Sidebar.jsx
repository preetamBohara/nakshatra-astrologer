"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  { label: "Dashboard", icon: "home", href: "/" },
  { label: "KYC Details", icon: "doc", badge: "check", href: "/kyc-details" },
  { label: "Payout History", icon: "history", href: "/payout-history" },
  { label: "Review & Ratings", icon: "user", href: "/review-ratings" },
  { label: "Blogs", icon: "doc", href: "/blogs" },
  { label: "Create Offer", icon: "help", href: "/create-offer" },
  { label: "Sessions", icon: "chat", href: "/sessions" },
  { label: "About Us", icon: "user", href: "/about-us" },
  { label: "Privacy Policy", icon: "wallet", href: "/privacy-policy" },
  { label: "Terms & Conditions", icon: "doc", href: "/terms-and-conditions" },
  { label: "Support", icon: "help", href: "/help-support" },
  { label: "Settings", icon: "history", href: "/settings" },
  { label: "Logout", icon: "logout", href: "/logout" },
];

function isActivePath(pathname, href) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuIcon({ name }) {
  const c = "h-5 w-5 shrink-0";
  if (name === "home")
    return (
      <svg className={c} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
      </svg>
    );
  if (name === "user")
    return (
      <svg className={c} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      </svg>
    );
  if (name === "doc")
    return (
      <svg className={c} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    );
  if (name === "chat")
    return (
      <svg className={c} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      </svg>
    );
  if (name === "wallet")
    return (
      <svg className={c} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M21 12V7H5a2 2 0 0 1 2-2h14v4M3 5v14a2 2 0 0 0 2 2h16v-5M18 12a2 2 0 1 0 0 4h4v-4h-4Z" />
      </svg>
    );
  if (name === "history")
    return (
      <svg className={c} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    );
  if (name === "help")
    return (
      <svg className={c} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
    );
  return (
    <svg className={c} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17h5v-5M21 3 9 15" />
    </svg>
  );
}

const Sidebar = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();

  return (
    <>
        <aside
          className={[
            "fixed inset-y-0 left-0 z-40 flex w-55 shrink-0 flex-col border-r border-[#E8E4EC] bg-white transition-transform duration-200 ease-out md:w-62.5 lg:static lg:z-auto lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          ].join(" ")}
        >
          <div className="m-3 rounded-2xl bg-[#FFF0E5] p-4">
            <div className="flex gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#E8D5CC]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#1a1a1a]">Girish sharma</p>
                <p className="text-xs text-[#666]">ID: —</p>
                <p className="text-xs text-[#666]">Followers: 0</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 pb-4">
            {MENU.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={[
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors",
                  isActivePath(pathname, item.href)
                    ? "bg-[#FFF0E5] font-medium text-[#1a1a1a]"
                    : "text-[#444] hover:bg-[#F8F6FA]",
                ].join(" ")}
              >
                <MenuIcon name={item.icon} />
                <span className="flex-1">{item.label}</span>
                {item.badge === "check" ? (
                  <span className="text-green-600" aria-hidden>
                    ✓
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        </aside>
    </>
  )
}

export default Sidebar