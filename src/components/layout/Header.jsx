import React from 'react'
import { Link } from 'react-router-dom'
import { Circle } from 'lucide-react'

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-el-blue-500 rounded-full flex items-center justify-center group-hover:shadow-el-glow transition-shadow">
              <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold font-poppins text-el-blue-400">
              Circle
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/auth/login"
              className="text-gray-600 hover:text-el-blue-600 transition-colors font-medium text-sm sm:text-base"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="btn-primary text-xs sm:text-sm px-3 py-1.5 sm:px-6 sm:py-3"
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