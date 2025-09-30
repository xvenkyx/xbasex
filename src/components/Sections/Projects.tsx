import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React & Node.js",
      longDescription: "A complete e-commerce platform featuring user authentication, product management, shopping cart, and payment integration. Built with modern web technologies and deployed on AWS.",
      image: "🛒",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Stripe"],
      category: "Full Stack",
      featured: true,
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application",
      longDescription: "Real-time task management application with team collaboration features, drag-and-drop interface, and progress tracking.",
      image: "✅",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind"],
      category: "Frontend",
      featured: true,
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather forecasting application",
      longDescription: "Weather dashboard with location-based forecasts, interactive maps, and historical data visualization.",
      image: "🌤️",
      technologies: ["Vue.js", "API Integration", "Chart.js"],
      category: "Frontend",
      featured: false,
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "ML Sentiment Analysis",
      description: "Machine learning sentiment analysis tool",
      longDescription: "Natural language processing application that analyzes text sentiment using machine learning algorithms.",
      image: "🤖",
      technologies: ["Python", "TensorFlow", "FastAPI", "React"],
      category: "Machine Learning",
      featured: true,
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const categories = ['All', ...new Set(projects.map(project => project.category))];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">My Projects</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12">
          Here are some of my recent works
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-6xl">
                {project.image}
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                {project.featured && (
                  <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-3 py-1 rounded-full mb-3">
                    Featured
                  </span>
                )}
                
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    View Project
                  </button>
                  <button className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <span className="text-lg">🔗</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-8xl mb-6 rounded-lg">
                  {selectedProject.image}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedProject.longDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-center font-medium transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl}
                      className="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 py-3 px-6 rounded-lg text-center font-medium transition-colors"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;