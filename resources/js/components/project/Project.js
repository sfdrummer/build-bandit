import React, { PureComponent, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import slugify from "slugify";
import pluralize from "pluralize";
import { Formik, Form, Field } from "formik";
import * as fields from "../misc/fields";
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
          <TypeInstance
            instance={instance}
            key={`instance-${instance.id}`}
            type={props.type}
            project={props.project}
          />
        ));
      }}
    </Query>
  );
};

const TypeInstance = props => {
  const { instance } = props;
  return (
    <div className="w-full bg-white shadow rounded px-8 pt-6 pb-8 mb-8">
      <h2 className="text-4xl text-grey-dark mb-4">
        <em>{instance.name}</em>
      </h2>
      <FieldInstanceList {...props} />
      <CreateFieldInstanceWrapper {...props} />
    </div>
  );
};

const FieldInstanceList = props => {
  return (
    <table className="table-auto w-full mb-8">
      <thead>
        <tr>
          <th className="text-left py-4">Field type</th>
          <th className="text-left py-4">Field name</th>
          <th className="text-left py-4">Machine name</th>
          <th className="text-left py-4">Group</th>
          <th className="text-left py-4">Description</th>
        </tr>
      </thead>
      <tbody>
        <Query
          query={queries.GET_FIELD_INSTANCES_FOR_TYPE_IN_PROJECT}
          variables={{
            type_instance_id: props.instance.id,
            project_id: props.project.id
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <p>Loading fields&hellip;</p>;
            if (error) return <p>Error loading fields!</p>;
            console.log(data);
            return data.fieldInstancesForTypeInProject.map(
              (fieldInstance, index) => (
                <FieldInstance
                  fieldInstance={fieldInstance}
                  project={props.project}
                  key={`fieldInstance-${fieldInstance.id}`}
                />
              )
            );
          }}
        </Query>
      </tbody>
    </table>
  );
};

const FieldInstance = ({ fieldInstance, project }) => {
  return (
    <tr>
      <Query
        query={queries.GET_FIELD_TYPES_FOR_CMS}
        variables={{ cms_id: project.cms.id }}
      >
        {({ data, loading, error }) => {
          if (loading || error) return null;

          return (
            <td className="py-2">
              <span className="bg-green-light py-1 px-2 rounded mr-4 text-white uppercase">
                {
                  _.find(data.fieldTypesForCms, ["id", fieldInstance.field_id])
                    .name
                }
              </span>
            </td>
          );
        }}
      </Query>
      <td className="py-2"><strong>{fieldInstance.name}</strong></td>
      <td className="py-2"><span>{fieldInstance.machine_name}</span></td>
      <td className="py-2"><span>{fieldInstance.group}</span></td>
      <td className="py-2"><span>{fieldInstance.description}</span></td>
    </tr>
  );
};

const CreateFieldInstanceWrapper = props => {
  return (
    <Mutation
      mutation={queries.CREATE_FIELD_INSTANCE}
      refetchQueries={[
        {
          query: queries.GET_FIELD_INSTANCES_FOR_TYPE_IN_PROJECT,
          variables: {
            project_id: props.project.id,
            type_instance_id: props.instance.id
          }
        }
      ]}
    >
      {(createFieldInstance, { data }) => (
        <Formik
          enableReinitialize
          onSubmit={(values, { setSubmitting, setValues }) => {
            createFieldInstance({
              variables: {
                ...values,
                project_id: props.project.id,
                type_instance_id: props.instance.id
              }
            }).then(response => {
              setValues({ name: "", description: "", machine_name: "" });
              setSubmitting(false);
            });
          }}
          render={formikProps => (
            <FieldInstanceForm {...formikProps} {...props} />
          )}
        />
      )}
    </Mutation>
  );
};

const FieldInstanceForm = ({
  values,
  errors,
  isSubmitting,
  handleSubmit,
  handleChange,
  handleBlur,
  setFieldTouched,
  project
}) => {
  let name;
  let machine_name;

  return (
    <Form
      className="border-t py-4"
      onSubmit={event => {
        event.preventDefault();
        name.focus();
        handleSubmit();
      }}
    >
      <h3 className="text-sm uppercase mb-4">Create new field</h3>
      <div className="flex">
        <input
          placeholder="Field name"
          name="name"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          ref={node => (name = node)}
          className="mr-4 appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          placeholder="machine_name"
          name="machine_name"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.machine_name}
          ref={node => (machine_name = node)}
          className="mr-4 appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
        />
        <Field
          type="select"
          name="field_id"
          component={fields.InlineCmsFieldsField}
          value={values.field_id}
          cms={project.cms}
        />
        <Field
          type="text"
          placeholder="Group"
          name="group"
          component={fields.InlineTextInputField}
          value={values.group}
        />
        <Field
          type="text"
          placeholder="Field description"
          name="description"
          component={fields.InlineTextInputField}
          value={values.description}
        />
        <button
          className="bg-blue mb-1 hover:bg-blue-dark text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create
        </button>
      </div>
    </Form>
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
            className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4"
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
