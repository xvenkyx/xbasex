import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-lg">
              JD
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Hello! I'm John, a passionate Full Stack Developer with 3+ years of experience 
              building scalable web applications. I specialize in React, Node.js, and AWS cloud services.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              I love turning complex problems into simple, beautiful solutions. When I'm not coding, 
              you'll find me exploring new technologies, contributing to open source, or hiking in nature.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10+</div>
                <div className="text-gray-600 dark:text-gray-300">Projects</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">3+</div>
                <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
              </div>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4">
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;