import gql from "graphql-tag";

const estudiosQuery = gql`
  query getEstudios($limit: Int!, $skip: Int!, $where: EstudioWhereInput) {
    getEstudios(limit: $limit, skip: $skip, where: $where) {
      edges {
        node {
          ...Estudio
        }
      }
      aggregate {
        count
      }
    }
  }
`;
export default estudiosQuery;
