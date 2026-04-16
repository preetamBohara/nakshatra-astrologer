const MENU = [
  { label: "Dashboard", active: true, icon: "home" },
  { label: "My Profile", active: false, icon: "user" },
  { label: "KYC Details", active: false, icon: "doc", badge: "check" },
  { label: "My Consultations", active: false, icon: "chat" },
  { label: "My Earnings", active: false, icon: "wallet" },
  { label: "Payout History", active: false, icon: "history" },
  { label: "Support", active: false, icon: "help" },
  { label: "Logout", active: false, icon: "logout" },
];

const METRICS = [
  { label: "Total Voice Calls", value: "1", change: "+80.00%", icon: "phone" },
  { label: "Total Video Calls", value: "0", change: "+0.00%", icon: "video" },
  { label: "Total Chats", value: "0", change: "+0.00%", icon: "bubble" },
  { label: "Total Earnings", value: "₹0", change: "+0.00%", icon: "rupee" },
  { label: "Total Duration", value: "0s", change: "+0.00%", icon: "clock" },
];

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

export default function DashboardPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      {/* Top bar */}
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

      {/* Sidebar + main */}
      <div className="flex min-h-0 flex-1 flex-row">
        {/* Sidebar */}
        <aside className="flex w-[220px] shrink-0 flex-col border-r border-[#E8E4EC] bg-white md:w-[250px]">
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
              <button
                key={item.label}
                type="button"
                className={[
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                  item.active ? "bg-[#FFF0E5] font-medium text-[#1a1a1a]" : "text-[#444] hover:bg-[#F8F6FA]",
                ].join(" ")}
              >
                <MenuIcon name={item.icon} />
                <span className="flex-1">{item.label}</span>
                {item.badge === "check" ? (
                  <span className="text-green-600" aria-hidden>
                    ✓
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-5">
          {/* Greeting + service toggles */}
          <section className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-stretch md:justify-between md:p-5">
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div>
                <h1 className="text-lg font-semibold text-[#1a1a1a] md:text-xl">Good morning, Girish sharma</h1>
                <p className="text-sm text-[#666]">Thu, 17 Apr 2026</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-[#444]">Offline</span>
                  <button
                    type="button"
                    className="relative h-6 w-11 shrink-0 rounded-full bg-[#D4D4D4] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow"
                    aria-pressed="false"
                    aria-label="Toggle online status"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-6 border-t border-[#F0ECF4] pt-4">
                <div>
                  <p className="text-xs text-[#888]">Earnings</p>
                  <p className="text-lg font-semibold text-[#1a1a1a]">₹0</p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">Duration</p>
                  <p className="text-lg font-semibold text-[#1a1a1a]">0s</p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">Consultations</p>
                  <p className="text-lg font-semibold text-[#1a1a1a]">0</p>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 md:flex-row md:gap-3">
              {["Chat", "Voice Calls", "Video Calls"].map((title) => (
                <div
                  key={title}
                  className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl border border-[#EEE8F0] bg-[#FDFBFF] p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#333]">{title}</span>
                    <button
                      type="button"
                      className="relative h-5 w-9 shrink-0 rounded-full bg-[#D4D4D4] after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white"
                      aria-label={`Toggle ${title}`}
                    />
                  </div>
                  <p className="text-xs text-[#888]">Sessions: 0</p>
                  <p className="text-sm font-semibold text-primary">₹0</p>
                </div>
              ))}
            </div>
          </section>

          {/* Chat requests */}
          <section className="flex min-h-[120px] flex-col rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-[#1a1a1a]">Chat Requests</h2>
            <div className="flex flex-1 items-center justify-center py-8 text-sm text-[#888]">
              No requests received yet
            </div>
          </section>

          {/* Performance row */}
          <section>
            <div className="flex flex-wrap gap-3 md:flex-nowrap md:justify-between">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-2xl border border-[#EEE8F0] bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <MetricIcon name={m.icon} />
                    <span className="text-xs font-medium text-green-600">{m.change}</span>
                  </div>
                  <p className="text-xl font-semibold text-[#1a1a1a]">{m.value}</p>
                  <p className="text-xs leading-snug text-[#666]">{m.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Earnings */}
          <section className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-[#1a1a1a]">Earnings</h2>
              <div className="flex items-center gap-2 text-sm text-[#555]">
                <button type="button" className="p-1" aria-label="Previous week">
                  ‹
                </button>
                <span>13 Apr - 19 Apr</span>
                <button type="button" className="p-1" aria-label="Next week">
                  ›
                </button>
                <button type="button" className="ml-1 rounded-lg border border-[#E0DCE4] p-2" aria-label="Open calendar">
                  <svg className="h-4 w-4" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 11h18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-[#E0DCE4] bg-[#FAFAFC] text-sm text-[#888]">
              Chart area placeholder
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
