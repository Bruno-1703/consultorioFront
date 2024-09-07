import gql from "graphql-tag";

const estudiosQuery = gql`
  query getEstudios($take: Int!, $skip: Int!, $where: EstudioWhereInput) {
    getEstudios(limit: $take, skip: $skip, where: $where) {
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
