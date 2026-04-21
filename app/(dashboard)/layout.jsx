"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { fetchDashboardProfile } from "@/redux/slices/dashboardSlice";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.dashboard.profile);
  const pathname = usePathname();
  const [sidebarState, setSidebarState] = useState({ open: false, path: "" });
  const isSidebarOpen = sidebarState.open && sidebarState.path === pathname;

  useEffect(() => {
    if (profileState.loading || profileState.loaded) return;
    void dispatch(fetchDashboardProfile());
  }, [dispatch, profileState.loading, profileState.loaded]);

  return (
    <div className="h-full w-full overflow-hidden flex flex-col bg-red-50">
      <Header onMenuClick={() => setSidebarState({ open: true, path: pathname })} />
      <div className="flex min-h-0 flex-1 flex-row">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarState({ open: false, path: pathname })} />
        <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden p-4 md:p-5">
          {children}
        </main>
      </div>
      {isSidebarOpen ? (
        <button
          type="button"
          onClick={() => setSidebarState({ open: false, path: pathname })}
          className="fixed inset-0 z-30 cursor-pointer bg-black/35 lg:hidden"
          aria-label="Close sidebar"
        />
      ) : null}
    </div>
  );
}


