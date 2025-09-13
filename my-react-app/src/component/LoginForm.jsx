// components/LoginForm.js
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginForm = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Video size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Connexion</h2>
        <p className="text-gray-300">Accédez à votre compte ChatRoulette</p>
      </div>

      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl border border-white border-opacity-20 p-8">
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white pl-12 pr-12 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading || !email || !password}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Connexion...
              </div>
            ) : (
              'Se connecter'
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onToggleForm}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Pas de compte ? Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;