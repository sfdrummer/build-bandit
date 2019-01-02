import React from "react";
import { Query } from "react-apollo";
import * as queries from "../../queries/queries";

export const TextInputField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div className="mb-4">
    <label
      className="block text-grey-darker text-sm font-bold mb-2"
      htmlFor={props.name}
    >
      {props.label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      {...field}
      {...props}
      placeholder={props.placeholder}
    />
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

export const TextAreaField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div className="mb-4">
    <label
      className="block text-grey-darker text-sm font-bold mb-2"
      htmlFor={props.name}
    >
      {props.label}
    </label>
    <textarea
      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      {...field}
      {...props}
      placeholder={props.placeholder}
      rows="5"
    />
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

export const CmsSelectField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div className="mb-6">
    <label
      className="block text-grey-darker text-sm font-bold mb-2"
      htmlFor={props.name}
    >
      {props.label}
    </label>
    <Query query={queries.GET_SYSTEMS}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return null;

        return (
          <select
            name="cms_id"
            {...field}
            {...props}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select CMS</option>
            {data.systems.map((system, index) => (
              <option value={system.id} key={`system-${index}`}>
                {system.name}
              </option>
            ))}
          </select>
        );
      }}
    </Query>
  </div>
);

export const InlineTextInputField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <input
    type="text"
    placeholder={props.placeholder}
    {...field}
    {...props}
    className="mr-4 appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
  />
);

export const InlineCmsFieldsField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <select
    name={props.name}
    {...field}
    {...props}
    className="mr-4 appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Field type</option>
    <Query
      query={queries.GET_FIELD_TYPES_FOR_CMS}
      variables={{ cms_id: props.cms.id }}
    >
      {({ data, loading, error }) => {
        if (loading) return null;
        if (error) return null;

        const groupedTypes = _.groupBy(data.fieldTypesForCms, "group");
        return Object.keys(groupedTypes).map((key, index) => (
          <optgroup label={key} key={`optgroup-${index}`}>
            {groupedTypes[key].map(item => (
              <option value={item.id} key={`opt-${item.id}`}>{item.name}</option>
            ))}
          </optgroup>
        ));
      }}
    </Query>
  </select>
);
