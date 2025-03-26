import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Auth App</h1>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link to="/" className="hover:text-gray-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300 transition">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/sign-up"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
