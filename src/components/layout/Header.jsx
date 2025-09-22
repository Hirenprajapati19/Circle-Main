import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1 group">
            {/* Circle Logo */}
            <img
              src="/circle-logo.png"
              alt="Circle Logo"
              className="w-8 h-8 rounded-full group-hover:shadow-[0_0_15px_rgba(220,38,38,0.6)] transition-shadow opacity-90"
            />
            <span className="text-xl font-bold font-poppins text-red-500">
              Circle
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/auth/login"
              className="text-gray-300 hover:text-red-500 transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-black hover:text-red-500 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header