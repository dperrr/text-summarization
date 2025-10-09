import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Book, Info, Menu, X } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-purple-700">TextSense</h1>


        <button
          className="md:hidden text-gray-700 hover:text-purple-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>


        <nav className="hidden md:flex space-x-6">
          <NavbarLink to="/" icon={<Home />} label="Dashboard" location={location} />
          <NavbarLink to="/summarizer" icon={<FileText />} label="Summarizer" location={location} />
          <NavbarLink to="/documentation" icon={<Book />} label="Documentation" location={location} />
          <NavbarLink to="/about" icon={<Info />} label="About Us" location={location} />
          <NavbarLink to="/overall" icon={<Info />} label="Overall" location={location} />
        </nav>
      </div>


      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col space-y-2 px-6 py-4">
            <NavbarLink to="/" icon={<Home />} label="Dashboard" location={location} />
            <NavbarLink to="/summarizer" icon={<FileText />} label="Summarizer" location={location} />
            <NavbarLink to="/documentation" icon={<Book />} label="Documentation" location={location} />
            <NavbarLink to="/about" icon={<Info />} label="About Us" location={location} />
            <NavbarLink to="/overall" icon={<Info />} label="Overall" location={location} />
          </nav>
        </div>
      )}
    </div>
  );
}

const NavbarLink = ({ to, icon, label, location }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
      location.pathname === to
        ? "text-purple-700 font-bold"
        : "text-gray-700 hover:text-purple-700"
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
