import React from "react";
import { Form, Field } from "formik";
import * as fields from "./fields";

export const CreateProjectForm = ({
  values,
  errors,
  isSubmitting,
  handleSubmit,
  handleChange,
  handleBlur,
  setFieldTouched
}) => {
  return (
    <Form>
      <h2 className="text-grey-darker text-xxl font-normal mb-4">
        Create new project
      </h2>
      <Field
        type="text"
        name="name"
        placeholder="A cool project"
        label="Project name"
        component={fields.TextInputField}
        value={values.name}
      />
      <Field
        type="textarea"
        name="description"
        placeholder="This project will be well planned and go without a hitch..."
        label="Description"
        component={fields.TextAreaField}
        value={values.description}
      />
      <Field
        name="cms_id"
        label="Project CMS"
        component={fields.CmsSelectField}
        value={values.cms_id}
      />
      <div className="flex items-center justify-between">
        <button
          className="bg-blue hover:bg-blue-dark text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create
        </button>
      </div>
    </Form>
  );
};
