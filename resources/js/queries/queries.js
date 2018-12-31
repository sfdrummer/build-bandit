import gql from "graphql-tag";

export const GET_PROJECTS = gql`
  {
    projects {
      id
      name
      cms {
        name
      }
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query ProjectById($id: ID!) {
    projectById(id: $id) {
      id
      name
      description
      cms {
        id
        name
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String, $cms_id: ID!) {
    createProject(name: $name, description: $description, cms_id: $cms_id) {
      id
      name
      cms {
        name
      }
    }
  }
`;

export const GET_SYSTEMS = gql`
  {
    systems {
      id
      name
    }
  }
`;

export const GET_TYPES_BY_CMS = gql`
  {
    systems {
      id
      name
      types {
        id
        name
      }
    }
  }
`;

export const GET_TYPES_FOR_CMS = gql`
  query TypesByCms($cms_id: ID!) {
    typesByCms(cms_id: $cms_id) {
      id
      name
    }
  }
`;

export const CREATE_TYPE = gql`
  mutation CreateType($name: String!, $cms_id: ID!) {
    createType(name: $name, cms_id: $cms_id) {
      id
      name
    }
  }
`;

export const DELETE_TYPE = gql`
  mutation DeleteType($id: ID!) {
    deleteType(id: $id) {
      id
      name
    }
  }
`;

export const GET_FIELD_TYPES_BY_CMS = gql`
  {
    systems {
      id
      name
      fieldTypes {
        id
        name
        group
        module_id
      }
    }
  }
`;

export const GET_FIELD_TYPES_FOR_CMS = gql`
  query FieldTypesForCms($cms_id: ID!){
    fieldTypesForCms(cms_id: $cms_id) {
      id
      name
      group
    }
  }
`;

export const CREATE_FIELD_TYPE = gql`
  mutation CreateFieldType(
    $name: String!
    $cms_id: ID!
    $group: String
    $module_id: ID
  ) {
    createFieldType(
      name: $name
      cms_id: $cms_id
      group: $group
      module_id: $module_id
    ) {
      id
      name
      group
    }
  }
`;

export const UPDATE_FIELD_TYPE = gql`
  mutation UpdateFieldType(
    $id: ID!
    $name: String!
    $group: String
    $module_id: ID
  ) {
    updateFieldType(
      id: $id
      name: $name
      group: $group
      module_id: $module_id
    ) {
      id
      name
      group
      module_id
    }
  }
`;

export const DELETE_FIELD_TYPE = gql`
  mutation DeleteFieldType($id: ID!) {
    deleteFieldType(id: $id) {
      id
      name
      group
    }
  }
`;

export const GET_MODULES_BY_CMS = gql`
  {
    systems {
      id
      name
      modules {
        id
        name
      }
    }
  }
`;

export const CREATE_MODULE = gql`
  mutation CreateModule($name: String!, $cms_id: ID!) {
    createModule(name: $name, cms_id: $cms_id) {
      id
      name
    }
  }
`;

export const DELETE_MODULE = gql`
  mutation DeleteModule($id: ID!) {
    deleteModule(id: $id) {
      id
      name
    }
  }
`;

export const GET_INSTANCES_FOR_PROJECT_TYPE = gql`
  query TypeInstancesForProjectType($type_id: ID!, $project_id: ID!){
    typeInstancesForProjectType(type_id: $type_id, project_id: $project_id) {
      id
      name
      machine_name
      description
      options
      type_id
      project_id
    }
  }
`;

export const CREATE_TYPE_INSTANCE = gql`
  mutation CreateTypeInstance(
    $name: String!
    $machine_name: String!
    $description: String
    $options: String
    $type_id: ID!
    $project_id: ID!
  ) {
    createTypeInstance(
      name: $name
      machine_name: $machine_name
      description: $description
      options: $options
      type_id: $type_id
      project_id: $project_id
    ) {
      id
      name
      description
      options
      type_id
      project_id
    }
  }
`;
