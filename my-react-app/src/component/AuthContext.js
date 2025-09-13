// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiCall } from '../config/api';

// Contexte d'authentification
const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider d'authentification
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérification du token au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          // Appel à votre API pour vérifier le token
          const response = await apiCall('/users/profile');
          setUser(response.data || response.user || response);
        } catch (error) {
          console.error('Token invalide:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Appel à votre API de connexion
      const response = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      // Gestion flexible des réponses d'API
      const token = response.token || response.accessToken || response.data?.token;
      const userData = response.user || response.data?.user || response.data || response;
      
      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true, user: userData };
      } else {
        throw new Error('Token manquant dans la réponse');
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Email ou mot de passe incorrect' 
      };
    }
  };

  const register = async (email, password, confirmPassword) => {
    try {
      if (password !== confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      // Appel à votre API d'inscription
      const response = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ 
          email, 
          password,
          name: email.split('@')[0] // Nom par défaut basé sur l'email
        }),
      });
      
      // Gestion flexible des réponses d'API
      const token = response.token || response.accessToken || response.data?.token;
      const userData = response.user || response.data?.user || response.data || response;
      
      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true, user: userData };
      } else {
        throw new Error('Token manquant dans la réponse');
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Erreur lors de l\'inscription' 
      };
    }
  };

  const logout = async () => {
    try {
      // Optionnel : appel à l'API pour invalider le token côté serveur
      await apiCall('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Continue même si l'API logout échoue
    } finally {
      // Nettoyage local dans tous les cas
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setUser(null);
    }
  };

  // Fonction pour mettre à jour le profil utilisateur
  const updateProfile = async (profileData) => {
    try {
      const response = await apiCall('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
      
      const userData = response.user || response.data?.user || response.data || response;
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Erreur de mise à jour du profil' 
      };
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    apiCall // Exposer apiCall pour d'autres composants
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };