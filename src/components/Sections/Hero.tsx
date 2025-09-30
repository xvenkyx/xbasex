import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
          JD
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          John Doe
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
          Full Stack Developer & Cloud Enthusiast
        </p>
        
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Building scalable web applications with modern technologies and AWS cloud services.
        </p>
        
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            View Projects
          </button>
          <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;