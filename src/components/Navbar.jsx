import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white px-6 py-4 flex justify-between items-center shadow">
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold">Briefos</h1>
        <Link to="/" className="hover:text-gray-500 text-blue-600">Dashboard</Link>
        <Link to="/summarizer" className="hover:text-gray-500">Summarizer</Link>
        <Link to="/search" className="hover:text-gray-500">Search</Link>
        <Link to="/documentation" className="hover:text-gray-500">Documentation</Link>
      </div>

      <div>
        <Link to="/about" className="hover:text-gray-500">About Us</Link>
      </div>
    </nav>
  );
}

export default Navbar;
