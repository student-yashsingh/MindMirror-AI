import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Journal", path: "/journal" },
    { name: "Chat", path: "/chat" },
    { name: "Reports", path: "/reports" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <div className="w-64 min-h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 p-6">

      <h1 className="text-2xl font-bold mb-10
      bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
      bg-clip-text text-transparent">
        MindMirror
      </h1>

      <nav className="flex flex-col gap-3">

        {links.map((link) => {

          const active = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`p-3 rounded-lg transition
              ${active
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}

      </nav>
    </div>
  );
}