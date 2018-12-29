import React, { PureComponent, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import slugify from "slugify";
import pluralize from "pluralize";
import * as queries from "../../queries/queries";
import ProjectHeader from "./ProjectHeader";

const Project = props => {
  return (
    <Fragment>
      <Query
        query={queries.GET_PROJECT_BY_ID}
        variables={{ id: props.match.params.id }}
      >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading&hellip;</p>;
          if (error) return <p>Error&hellip;</p>;

          return <ProjectWorkspace project={data.projectById} />;
        }}
      </Query>
    </Fragment>
  );
};

const ProjectWorkspace = ({ project }) => {
  return (
    <Fragment>
      <ProjectHeader project={project} />
      <ProjectTypes project={project} />
    </Fragment>
  );
};

const ProjectTypes = props => {
  return (
    <div className="py-4 px-8 mt-16">
      <Query
        query={queries.GET_TYPES_FOR_CMS}
        variables={{ cms_id: props.project.cms.id }}
      >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading&hellip;</p>;
          if (error) return <p>Error&hellip;</p>;

          return data.typesByCms.map((type, index) => (
            <ProjectType
              type={type}
              project={props.project}
              key={`instanceType-${type.id}`}
            />
          ));
        }}
      </Query>
    </div>
  );
};

class ProjectType extends PureComponent {
  state = {
    createOpen: false
  };

  toggleCreateOpen = () => {
    this.setState({ createOpen: !this.state.createOpen });
  };

  render() {
    const { type, project } = this.props;
    return (
      <div className="mb-10">
        <h2 className="text-5xl text-grey mb-4">
          <em>{pluralize(type.name)}</em>
        </h2>
        <TypeInstanceList type={type} project={project} />
        {this.state.createOpen && (
          <CreateTypeInstanceForm
            type={type}
            project={project}
            toggleCreateOpen={this.toggleCreateOpen}
          />
        )}
        <div>
          <a
            href="#"
            className="flex items-center no-underline text-blue-darker"
            onClick={this.toggleCreateOpen}
          >
            <i className="fas fa-plus-square fa-3x mr-4" />
            <span>Create new {type.name}</span>
          </a>
        </div>
      </div>
    );
  }
}

const TypeInstanceList = props => {
  return (
    <Query
      query={queries.GET_INSTANCES_FOR_PROJECT_TYPE}
      variables={{ type_id: props.type.id, project_id: props.project.id }}
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Loading&hellip;</p>;
        if (error) return <p>Error&hellip;</p>;

        return data.typeInstancesForProjectType.map((instance, index) => (
          <TypeInstance instance={instance} key={`instance-${instance.id}`} />
        ));
      }}
    </Query>
  );
};

const TypeInstance = props => {
  const { instance } = props;
  return (
    <div className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-4xl text-grey-dark mb-4">
        <em>{instance.name}</em>
      </h2>
    </div>
  );
};

const CreateTypeInstanceForm = props => {
  let name;
  let machine_name;
  let description;

  const { type, project } = props;

  return (
    <div className="w-full">
      <Mutation
        mutation={queries.CREATE_TYPE_INSTANCE}
        refetchQueries={[
          {
            query: queries.GET_INSTANCES_FOR_PROJECT_TYPE,
            variables: { project_id: project.id, type_id: type.id }
          }
        ]}
        onCompleted={props.toggleCreateOpen}
      >
        {(createTypeInstance, { data }) => (
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={event => {
              event.preventDefault();
              createTypeInstance({
                variables: {
                  name: name.value,
                  machine_name: machine_name.value,
                  description: description.value,
                  project_id: project.id,
                  type_id: type.id
                }
              });
            }}
          >
            <h2 className="text-grey-darker text-xxl font-normal mb-4">
              Create new {type.name}
            </h2>
            <div className="flex">
              <div className="w-1/4 pr-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  {type.name} name
                </label>
                <input
                  className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Type name"
                  name="name"
                  ref={node => {
                    name = node;
                  }}
                  onChange={() => {
                    machine_name.value = slugify(name.value, {
                      replacement: "_",
                      lower: true
                    });
                  }}
                />
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="machine_name"
                >
                  Machine name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="type_name"
                  name="machine_name"
                  ref={node => {
                    machine_name = node;
                  }}
                />
              </div>
              <div className="w-1/4 pl-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Provide a description for this type"
                  name="description"
                  ref={node => {
                    description = node;
                  }}
                  rows="5"
                />
              </div>
              <div className="w-1/4 pl-4 self-end">
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue mb-1 hover:bg-blue-dark text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Mutation>
    </div>
  );
};

export default Project;
