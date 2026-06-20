import React from 'react'

export default function Welcome({onNavigate}) {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-purple-400 to-indigo-300 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Inventory Management System
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your inventory items
        </p>
        <button
          onClick={() => onNavigate('dashboard')} 
          className="bg-purple-800 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}
