import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col bg-red-50">
      <Header/>
      <div className="flex min-h-0 flex-1 flex-row">
        <Sidebar/>
        <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
