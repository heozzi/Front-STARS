import React from 'react';

type Project = {
  title: string;
  description: string;
};

// React.FC : Function Component 타입
const Projects: React.FC = () => {
  const projectList: Project[] = [
    {
      title: 'Portfolio Website',
      description: 'Personal website with animations and fullpage scroll.',
    },
    {
      title: 'React Chat App',
      description: 'Real-time chat using socket.io and React.',
    },
    {
      title: 'AI Cooking Assistant',
      description: 'GPT-powered assistant for recommending and generating recipes.',
    },
  ];

  return (
    <section>
      <h1>My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {projectList.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 p-6 bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
