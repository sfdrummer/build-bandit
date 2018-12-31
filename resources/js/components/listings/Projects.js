import React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { Formik } from "formik";
import * as queries from "../../queries/queries";
import * as forms from "../misc/forms";

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
  return (
    <div className="w-full max-w-md bg-white shadow rounded px-8 pt-6 pb-8 mb-4">
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
          <Formik
            enableReinitialize
            component={forms.CreateProjectForm}
            initialValues={{ name: "", description: "", cms_id: "" }}
            onSubmit={(values, { setSubmitting }) => {
              createProject({
                variables: values
              });
              setSubmitting(false);
            }}
          />
        )}
      </Mutation>
    </div>
  );
};

export default Projects;
