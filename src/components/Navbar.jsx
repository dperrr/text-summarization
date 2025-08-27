import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Search, Book, Info } from "lucide-react";

function Navbar() {
  const location = useLocation();

  return (
    <div className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-purple-700">Briefos</h1>
        <nav className="flex space-x-6">
          <NavbarLink to="/" icon={<Home />} label="Dashboard" location={location} />
          <NavbarLink to="/summarizer" icon={<FileText />} label="Summarizer" location={location} />
          <NavbarLink to="/documentation" icon={<Book />} label="Documentation" location={location} />
          <NavbarLink to="/about" icon={<Info />} label="About Us" location={location} />
           <NavbarLink to="/overall" icon={<Info />} label="Overall" location={location} />
        </nav>
      </div>
    </div>
  );
}

const NavbarLink = ({ to, icon, label, location }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
      location.pathname === to ? "text-purple-700 font-bold" : "text-gray-700 hover:text-purple-700"
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
