import React from 'react';

const ProjectHeader = ({ project }) => {
  return (
    <div className="bg-grey-darkest px-8 py-10">
      <h1 className="text-white font-normal mb-4">{project.name}</h1>
      <p className="mb-4 text-white">{project.cms.name}</p>
      <hr className="border-b border-white mt-6 mb-4" />
      <p className="mb-0 text-white leading-loose">{project.description}</p>
    </div>
  );
};

export default ProjectHeader;
