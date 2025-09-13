// components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ message = "Chargement..." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;