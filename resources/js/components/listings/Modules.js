import React from "react";
import { Query, Mutation } from "react-apollo";
import * as queries from "../../queries/queries";

const Types = props => {
  return (
    <div className="md:flex md:justify-around mt-16">
      <ModuleList />
      <ModuleForm />
    </div>
  );
};

const ModuleList = props => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-grey-darker text-xxl font-normal mb-4">Modules</h2>
        <hr className="border-b my-4" />
        <Query query={queries.GET_MODULES_BY_CMS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading&hellip;</p>;
            if (error) return <p>Loading failed&hellip;</p>;

            return data.systems.map((cms, index) => (
              <ModuleListCms
                cms={cms}
                key={`typecms-${index}`}
                last={data.systems.length === index + 1}
              />
            ));
          }}
        </Query>
      </div>
    </div>
  );
};

const ModuleListCms = ({ cms, last }) => {
  return (
    <div className="mb-4">
      <h2 className="text-grey-darker text-xl font-normal mb-4">{cms.name}</h2>
      {cms.modules.map((module, index) => (
        <ModuleListItem module={module} key={`module-${module.id}`} />
      ))}
      {!last && <hr className="border-b my-4" />}
    </div>
  );
};

const ModuleListItem = props => {
  console.log(props.module)
  return (
    <div className="py-4 text-black block hover:bg-grey-lighter flex justify-between">
      {props.module.name}
      <DeleteModule moduleId={props.module.id} />
    </div>
  );
};

const DeleteModule = ({ typeId }) => {
  return (
    <Mutation
      mutation={queries.DELETE_MODULE}
      refetchQueries={[{ query: queries.GET_MODULES_BY_CMS }]}
    >
      {(deleteType, { data }) => (
        <form
          onSubmit={event => {
            event.preventDefault();
            deleteType({
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

const ModuleForm = props => {
  let name;
  let cms;

  return (
    <div className="w-full max-w-md">
      <Mutation
        mutation={queries.CREATE_MODULE}
        refetchQueries={[{ query: queries.GET_MODULES_BY_CMS }]}
      >
        {(createModule, { data }) => (
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={event => {
              event.preventDefault();
              createModule({
                variables: {
                  name: name.value,
                  cms_id: cms.value
                }
              });
              name.value = "";
              name.focus();
            }}
          >
            <h2 className="text-grey-darker text-xxl font-normal mb-4">
              Create new type
            </h2>
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="username"
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
            <div className="mb-6">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="password"
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

export default Types;
