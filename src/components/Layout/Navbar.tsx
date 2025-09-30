import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-900">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`${
                location.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
              } px-3 py-2 font-medium`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`${
                location.pathname === '/projects' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
              } px-3 py-2 font-medium`}
            >
              Projects
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu - Simple show/hide */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`${
                location.pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } block py-2 px-4 hover:bg-gray-50`}
            >
              Home
            </Link>
            <Link
              to="/projects"
              onClick={() => setIsMenuOpen(false)}
              className={`${
                location.pathname === '/projects' ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } block py-2 px-4 hover:bg-gray-50`}
            >
              Projects
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;