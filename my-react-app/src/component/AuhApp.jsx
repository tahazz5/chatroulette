// components/AuthApp.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserDashboard from './UserDashboard';
import LoadingSpinner from './LoadingSpinner';

const AuthApp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Vérification de l'authentification..." />;
  }

  if (user) {
    return <UserDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {isLogin ? (
        <LoginForm onToggleForm={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onToggleForm={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthApp;