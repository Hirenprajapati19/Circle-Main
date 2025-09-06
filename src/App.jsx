import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './routes/Landing'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Dashboard from './routes/Dashboard'
import { AuthProvider } from './store/useAuth'
import { UIProvider } from './store/useUI'

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </UIProvider>
    </AuthProvider>
  )
}

export default App