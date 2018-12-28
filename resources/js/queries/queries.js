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
