import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 80 },
        { name: "Vue.js", level: 70 }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "Express.js", level: 75 },
        { name: "GraphQL", level: 70 }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 80 },
        { name: "Docker", level: 75 },
        { name: "CI/CD", level: 70 },
        { name: "Serverless", level: 65 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Skills & Technologies</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12">
          Technologies I work with to bring ideas to life
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-6 text-center">{category.title}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Logos */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              'React', 'TypeScript', 'Node.js', 'AWS', 'Python', 
              'Docker', 'MongoDB', 'GraphQL', 'Tailwind', 'Git'
            ].map((tech) => (
              <div 
                key={tech}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <span className="text-2xl">⚡</span>
                </div>
                <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;