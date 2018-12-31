import React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import * as queries from "../../queries/queries";

const Projects = props => {
  return (
    <div className="md:flex md:justify-around mt-16">
      <ProjectList />
      <ProjectForm />
    </div>
  );
};

const ProjectList = props => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-grey-darker text-xxl font-normal mb-4">Projects</h2>
        <hr className="border-b my-4" />
        <Query query={queries.GET_PROJECTS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading&hellip;</p>;
            if (error) return <p>Loading failed&hellip;</p>;

            return data.projects.map((project, index) => (
              <ProjectListItem project={project} key={`project-${index}`} />
            ));
          }}
        </Query>
      </div>
    </div>
  );
};

const ProjectListItem = ({ project }) => {
  return (
    <p>
      <Link
        to={`/projects/${project.id}`}
        className="no-underline py-4 text-black block hover:bg-grey-lighter"
      >
        {project.name}
      </Link>
    </p>
  );
};

const ProjectForm = props => {
  let name;
  let description;
  let cms;

  return (
    <div className="w-full max-w-md">
      <Mutation
        mutation={queries.CREATE_PROJECT}
        update={(cache, { data: { createProject } }) => {
          const { projects } = cache.readQuery({ query: queries.GET_PROJECTS });
          cache.writeQuery({
            query: queries.GET_PROJECTS,
            data: { projects: projects.concat([createProject]) }
          });
        }}
      >
        {(createProject, { data }) => (
          <form
            className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={event => {
              event.preventDefault();
              createProject({
                variables: {
                  name: name.value,
                  description: description.value,
                  cms_id: cms.value
                }
              });
              name.value = "";
              description.value = "";
              cms.value = "";
            }}
          >
            <h2 className="text-grey-darker text-xxl font-normal mb-4">
              Create new project
            </h2>
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="username"
              >
                Project name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Cool new project"
                name="name"
                ref={node => {
                  name = node;
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="password"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline mb-0"
                placeholder="This project will be well planned and go without a hitch..."
                rows="4"
                name="description"
                ref={node => {
                  description = node;
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="password"
              >
                Project CMS
              </label>
              <select
                name="cms_id"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                ref={node => {
                  cms = node;
                }}
              >
                <Query query={queries.GET_SYSTEMS}>
                  {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return null;

                    return data.systems.map((system, index) => (
                      <option value={system.id} key={`system-${index}`}>
                        {system.name}
                      </option>
                    ));
                  }}
                </Query>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue hover:bg-blue-dark text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        )}
      </Mutation>
    </div>
  );
};

export default Projects;
