import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './routes/Landing'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Dashboard from './routes/Dashboard'
import { AuthProvider, useAuth } from './store/useAuth'
import { UIProvider } from './store/useUI'

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/auth/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
      <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
          <AppRoutes />
        </div>
      </UIProvider>
    </AuthProvider>
  )
}

export default App