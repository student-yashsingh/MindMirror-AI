import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#05010a] text-white">
      <Sidebar />
      <div className="flex-1 p-12">
        {children}
      </div>
    </div>
  );
}