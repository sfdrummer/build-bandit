import React, { PureComponent } from "react";
import { Query, Mutation } from "react-apollo";
import * as queries from "../../queries/queries";

const FieldTypes = props => {
  return (
    <div className="md:flex md:justify-around mt-16">
      <FieldTypesList />
      <FieldTypesForm />
    </div>
  );
};

const FieldTypesList = props => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-grey-darker text-xxl font-normal mb-4">
          Field types
        </h2>
        <hr className="border-b my-4" />
        <Query query={queries.GET_FIELD_TYPES_BY_CMS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading&hellip;</p>;
            if (error) return <p>Loading failed&hellip;</p>;

            return data.systems.map((cms, index) => (
              <FieldListCms
                cms={cms}
                key={`fieldcms-${index}`}
                last={data.systems.length === index + 1}
              />
            ));
          }}
        </Query>
      </div>
    </div>
  );
};

const FieldListCms = ({ cms, last }) => {
  const groupedTypes = _.groupBy(cms.fieldTypes, "group");
  return (
    <div className="mb-4">
      <h2 className="text-grey-darker text-xl font-normal mb-6">{cms.name}</h2>
      {Object.keys(groupedTypes).map((key, index) => (
        <div className="mb-6">
          <h3 className="text-sm uppercase text-grey-dark mb-2">
            {key === "null" ? `No group` : key}
          </h3>
          {groupedTypes[key].map((item, index) => (
            <FieldTypeListItem type={item} key={`fieldtype-${item.id}`} />
          ))}
        </div>
      ))}
      {!last && <hr className="border-b my-4" />}
    </div>
  );
};

class FieldTypeListItem extends PureComponent {
  state = {
    edit: false
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    const { type } = this.props;
    return (
      <React.Fragment>
        <div className="py-2 text-black block hover:bg-grey-lighter flex justify-between">
          <span className="flex-1">{type.name}</span>
          <span className="flex">
            <button onClick={this.toggleEdit} className="mr-4">
              <i className="fas fa-edit" />
            </button>
            <DeleteFieldType typeId={type.id} />
          </span>
        </div>
        {this.state.edit && (
          <EditFieldTypeForm type={type} toggleEdit={this.toggleEdit} />
        )}
      </React.Fragment>
    );
  }
}

const EditFieldTypeForm = ({ type, toggleEdit }) => {
  let name;
  let group;
  let module;

  return (
    <Mutation
      mutation={queries.UPDATE_FIELD_TYPE}
      refreshQueries={[{ query: queries.GET_FIELD_TYPES_BY_CMS }]}
      onCompleted={toggleEdit}
    >
      {(editFieldType, { data }) => (
        <form
          onSubmit={event => {
            event.preventDefault();
            editFieldType({
              variables: {
                id: type.id,
                name: name.value,
                group: group.value,
                module_id: module.value
              }
            });
          }}
        >
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="name"
            >
              Type name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Type name"
              name="name"
              ref={node => {
                name = node;
              }}
              defaultValue={type.name}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="group"
            >
              Type group
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Type name"
              name="group"
              ref={node => {
                group = node;
              }}
              defaultValue={type.group}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="cms_id"
            >
              Module
            </label>
            <select
              name="cms_id"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-0 leading-tight focus:outline-none focus:shadow-outline"
              ref={node => {
                module = node;
              }}
              defaultValue={type.module_id}
            >
              <option value="">None</option>
              <Query query={queries.GET_MODULES_BY_CMS}>
                {({ loading, error, data }) => {
                  if (loading) return null;
                  if (error) return null;

                  return data.systems.map((system, index) => (
                    <optgroup
                      value={system.id}
                      key={`system-${index}`}
                      label={system.name}
                    >
                      {system.modules.map((module, index) => (
                        <option value={module.id} key={`module-${module.id}`}>
                          {module.name}
                        </option>
                      ))}
                    </optgroup>
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
              Save
            </button>
          </div>
        </form>
      )}
    </Mutation>
  );
};

const DeleteFieldType = ({ typeId }) => {
  return (
    <Mutation
      mutation={queries.DELETE_FIELD_TYPE}
      refetchQueries={[{ query: queries.GET_FIELD_TYPES_BY_CMS }]}
    >
      {(deleteFieldType, { data }) => (
        <form
          onSubmit={event => {
            event.preventDefault();
            deleteFieldType({
              variables: {
                id: typeId
              }
            });
          }}
        >
          <button type="submit">
            <i className="fas fa-trash-alt" />
          </button>
        </form>
      )}
    </Mutation>
  );
};

const FieldTypesForm = props => {
  let name;
  let group;
  let module;
  let cms;

  return (
    <div className="w-full max-w-md">
      <Mutation
        mutation={queries.CREATE_FIELD_TYPE}
        refetchQueries={[{ query: queries.GET_FIELD_TYPES_BY_CMS }]}
      >
        {(createFieldType, { data }) => (
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={event => {
              event.preventDefault();
              createFieldType({
                variables: {
                  name: name.value,
                  group: group.value,
                  cms_id: cms.value,
                  module_id: module.value
                }
              });
              name.value = "";
              name.focus();
            }}
          >
            <h2 className="text-grey-darker text-xxl font-normal mb-4">
              Create new field type
            </h2>
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="name"
              >
                Type name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Type name"
                name="name"
                ref={node => {
                  name = node;
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="group"
              >
                Type group
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Text"
                name="group"
                ref={node => {
                  group = node;
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="cms_id"
              >
                Module
              </label>
              <select
                name="cms_id"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-0 leading-tight focus:outline-none focus:shadow-outline"
                ref={node => {
                  module = node;
                }}
              >
                <option value="">None</option>
                <Query query={queries.GET_MODULES_BY_CMS}>
                  {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return null;

                    return data.systems.map((system, index) => (
                      <optgroup
                        value={system.id}
                        key={`system-${index}`}
                        label={system.name}
                      >
                        {system.modules.map((module, index) => (
                          <option value={module.id} key={`module-${module.id}`}>
                            {module.name}
                          </option>
                        ))}
                      </optgroup>
                    ));
                  }}
                </Query>
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="cms_id"
              >
                CMS
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

export default FieldTypes;
