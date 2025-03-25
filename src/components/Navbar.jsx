import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Search, Book, Info } from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div
        className={`fixed h-screen w-64 bg-white shadow-lg p-5 flex flex-col space-y-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >

        <h1 className="text-2xl font-bold">Briefos</h1>

   
        <nav className="flex flex-col space-y-4">
          <SidebarLink to="/" icon={<Home />} label="Dashboard" location={location} />
          <SidebarLink to="/summarizer" icon={<FileText />} label="Summarizer" location={location} />
          <SidebarLink to="/search" icon={<Search />} label="Search" location={location} />
          <SidebarLink to="/documentation" icon={<Book />} label="Documentation" location={location} />
          <SidebarLink to="/about" icon={<Info />} label="About Us" location={location} />
        </nav>
      </div>


      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 left-5 bg-gray-800 text-white p-2 rounded-full"
      >
        ☰
      </button>
    </div>
  );
}

const SidebarLink = ({ to, icon, label, location }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition ${
      location.pathname === to ? "text-gray-900 font-bold" : "text-gray-700"
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Sidebar;
