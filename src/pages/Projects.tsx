import React from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  description: string;
  path: string;
  technologies: string[];
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Chat Application",
      description: "Real-time chat application with multiple rooms",
      path: "/projects/chat",
      technologies: ["React", "WebSocket", "Node.js"]
    },
    {
      id: 2,
      title: "Todo App",
      description: "Simple task management application",
      path: "/projects/todo",
      technologies: ["React", "TypeScript", "Local Storage"]
    },
    {
      id: 3,
      title: "Weather App",
      description: "Weather forecasting application",
      path: "/projects/weather",
      technologies: ["React", "API Integration", "Geolocation"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Projects</h1>
      <p className="text-gray-600 mb-8 sm:mb-12">
        Interactive applications built within this portfolio
      </p>

      <div className="space-y-4 sm:space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-blue-300 transition-colors">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Link 
                to={project.path}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base w-full sm:w-auto text-center"
              >
                Open App
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;