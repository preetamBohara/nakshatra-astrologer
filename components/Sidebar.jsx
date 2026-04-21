"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getBackendImageUrl } from "@/lib/getBackendImageUrl";

const MENU = [
  { labelKey: "dashboard", fallbackLabel: "Dashboard", icon: "home", href: "/" },
  { labelKey: "kycDetails", fallbackLabel: "KYC Details", icon: "doc", badge: "check", href: "/kyc-details" },
  { labelKey: "payoutHistory", fallbackLabel: "Payout History", icon: "history", href: "/payout-history" },
  { labelKey: "reviewRatings", fallbackLabel: "Review & Ratings", icon: "user", href: "/review-ratings" },
  { labelKey: "blogs", fallbackLabel: "Blogs", icon: "doc", href: "/blogs" },
  { labelKey: "offers", fallbackLabel: "Offers", icon: "offer", href: "/offers" },
  { labelKey: "sessions", fallbackLabel: "Sessions", icon: "chat", href: "/sessions" },
  { labelKey: "aboutUs", fallbackLabel: "About Us", icon: "user", href: "/about-us" },
  { labelKey: "privacyPolicy", fallbackLabel: "Privacy Policy", icon: "wallet", href: "/privacy-policy" },
  { labelKey: "termsConditions", fallbackLabel: "Terms & Conditions", icon: "doc", href: "/terms-and-conditions" },
  { labelKey: "helpSupport", fallbackLabel: "Support", icon: "help", href: "/help-support" },
  { labelKey: "settings", fallbackLabel: "Settings", icon: "history", href: "/settings" },
  { labelKey: "logout", fallbackLabel: "Logout", icon: "logout", href: "/logout" },
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
        <path d="M4 12a8 8 0 0 1 16 0" />
        <rect x="3" y="12" width="4" height="6" rx="2" />
        <rect x="17" y="12" width="4" height="6" rx="2" />
        <path d="M7 20h6a3 3 0 0 0 3-3" />
      </svg>
    );
  if (name === "offer")
    return (
      <svg className={c} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3.4 13.4a2 2 0 0 1 0-2.8L10.6 3.4a2 2 0 0 1 1.4-.6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-.6 1.4Z" />
        <circle cx="16" cy="8" r="1.3" />
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
  const { t } = useTranslation();
  const profile = useSelector((state) => state.dashboard.profile.data);

  const displayName = profile?.fullName || profile?.name || "Girish sharma";
  const displayId = profile?.astroId || "â€”";
  const followerCount = Array.isArray(profile?.followers)
    ? profile.followers.length
    : profile?.followersCount ?? profile?.followers ?? 0;
  const profileImagePath = profile?.image ? getBackendImageUrl(profile.image) : "";

  return (
    <>
        <aside
          className={[
            "fixed inset-y-0 left-0 z-40 flex w-55 shrink-0 flex-col border-r border-primary/15 bg-white transition-transform duration-200 ease-out md:w-62.5 lg:static lg:z-auto lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          ].join(" ")}
        >
          <div className="m-3 rounded-2xl border border-primary/20 bg-white p-4">
            <div className="flex gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-primary/25 bg-primary-light">
                {profileImagePath ? (
                  <img src={profileImagePath} alt="Profile" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#1a1a1a]">{displayName}</p>
                <p className="text-xs text-primary/80 line-clamp-1">{`ID: ${displayId}`}</p>
                <p className="text-xs text-primary/80">{`Followers: ${followerCount}`}</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 pb-4">
            {MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={[
                  "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors",
                  isActivePath(pathname, item.href)
                    ? "bg-primary/12 font-medium text-primary"
                    : "text-[#444] hover:bg-primary/8 hover:text-primary",
                ].join(" ")}
              >
                <MenuIcon name={item.icon} />
                <span className="flex-1">{t(item.labelKey) || item.fallbackLabel}</span>
                {item.badge === "check" ? (
                  <span className="text-green-600" aria-hidden>
                    âœ“
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
