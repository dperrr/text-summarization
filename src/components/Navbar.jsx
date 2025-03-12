import React from "react";

function Navbar() {



  


  return (
    <nav className="bg-white px-6 py-4 flex justify-between items-center">


      <div className="flex items-center space-x-10">
        <h1 className="text-xl font-bold">Briefos</h1>
        <a href="#" className="hover:text-gray-900 text-blue-600">Dashboard</a>
        <a href="#" className="hover:text-gray-300 text-gray-700">Summarizer</a>
        <a href="#" className="hover:text-gray-300 text-gray-700">Search</a>
        <a href="#" className="hover:text-gray-300 text-gray-700">Documentation</a>
      </div>


      <div>
        <a href="#" className="hover:text-gray-300">About Us</a>
      </div>
    </nav>
  );
}

export default Navbar;
