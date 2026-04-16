export default function DashboardLayout({ children }) {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col bg-red-50">
      {children}
    </div>
  );
}
