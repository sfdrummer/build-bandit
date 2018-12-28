import React from 'react';
import { Query, Mutation } from "react-apollo";
import * as queries from "../../queries/queries";

const Types = props => {
  return (
    <div className="md:flex md:justify-around mt-16">
      <TypeList />
    </div>
  );
}

const TypeList = props => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-grey-darker text-xxl font-normal mb-4">Types</h2>
        <hr className="border-b my-4" />
        <Query query={queries.GET_TYPES_BY_CMS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading&hellip;</p>;
            if (error) return <p>Loading failed&hellip;</p>;

            return data.systems.map((cms, index) => (
              <TypeListCms cms={cms} key={`typecms-${index}`} />
            ));
          }}
        </Query>
      </div>
    </div>
  );
};

const TypeListCms = ({cms}) => {
  return (
    <div className="mb-4">
      <h2 className="text-grey-darker text-xl font-normal mb-4">{ cms.name }</h2>
      { cms.types.map((type, index) => (
        <TypeListItem type={type} key={`type-${type.id}`} />
      ))}
    </div>
  )
}

const TypeListItem = ({ type }) => {
  return (
    <p className="py-4 text-black block hover:bg-grey-lighter">
      {type.name}
    </p>
  );
};

export default Types;
