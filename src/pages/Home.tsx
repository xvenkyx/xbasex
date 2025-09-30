import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="text-center py-8 sm:py-16">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl sm:text-2xl font-bold">
          JD
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">John Doe</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">Full Stack Developer</p>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
          Building scalable web applications with modern technologies. 
          Check out my projects below.
        </p>
        <Link 
          to="/projects"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          View Projects
        </Link>
      </section>

      {/* Skills Section */}
      <section className="py-8 sm:py-12">
        <h2 className="text-2xl font-bold mb-6 sm:mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-4 sm:p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2 sm:mb-3 text-lg">Frontend</h3>
            <p className="text-gray-600 text-sm sm:text-base">React, TypeScript, Tailwind CSS</p>
          </div>
          <div className="p-4 sm:p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2 sm:mb-3 text-lg">Backend</h3>
            <p className="text-gray-600 text-sm sm:text-base">Node.js, Python, AWS</p>
          </div>
          <div className="p-4 sm:p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2 sm:mb-3 text-lg">Database</h3>
            <p className="text-gray-600 text-sm sm:text-base">DynamoDB, MongoDB, PostgreSQL</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;