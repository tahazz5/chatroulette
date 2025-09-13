// components/UserDashboard.js
import React from 'react';
import { User, Settings, Video, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black bg-opacity-30 backdrop-blur-sm border-b border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <Video size={16} />
              </div>
              <h1 className="text-xl font-bold text-white">ChatRoulette</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold"
                  style={{ display: user.avatar ? 'none' : 'flex' }}
                >
                  {(user.name || user.username || user.email || 'U')[0].toUpperCase()}
                </div>
                <span className="text-white font-medium">{user.name || user.username || user.email}</span>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-colors"
              >
                <LogOut size={16} />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl border border-white border-opacity-20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Tableau de bord</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="text-purple-400" size={24} />
                  <h3 className="text-lg font-semibold text-white">Profil</h3>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Nom:</strong> {user.name || user.username || 'Non défini'}</p>
                  <p><strong>ID:</strong> {user.id || user._id}</p>
                  <p><strong>Membre depuis:</strong> {
                    user.joinDate || user.createdAt 
                      ? new Date(user.joinDate || user.createdAt).toLocaleDateString('fr-FR')
                      : 'Non défini'
                  }</p>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Settings className="text-blue-400" size={24} />
                  <h3 className="text-lg font-semibold text-white">Actions</h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-all">
                    Commencer un chat
                  </button>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all">
                    Paramètres du profil
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-300 mb-4">
                Bienvenue sur ChatRoulette ! Vous pouvez maintenant commencer à discuter avec des personnes du monde entier.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-200 px-4 py-2 rounded-lg">
                  ✓ Compte vérifié
                </div>
                <div className="bg-blue-500 bg-opacity-20 border border-blue-500 text-blue-200 px-4 py-2 rounded-lg">
                  🌟 Utilisateur actif
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;