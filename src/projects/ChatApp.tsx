import React from 'react';
import { Link } from 'react-router-dom';

const ChatApp: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6">
        <Link to="/projects" className="text-blue-600 hover:text-blue-800 text-sm sm:text-base">
          ← Back to Projects
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold mt-3 sm:mt-4">Chat Application</h1>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center">
        <div className="text-4xl sm:text-6xl mb-4">💬</div>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Chat App Placeholder</h2>
        <p className="text-gray-600 text-sm sm:text-base">Real-time chat application will be built here</p>
      </div>
    </div>
  );
};

export default ChatApp;