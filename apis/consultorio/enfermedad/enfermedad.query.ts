import gql from "graphql-tag";

const enfermedadesQuery = gql`
  query getEnfermedades($limit: Int!, $skip: Int!, $where: EnfermedadWhereInput) {
    getEnfermedades(limit: $limit, skip: $skip, where: $where) {
      edges {
        node {
          ...Enfermedad
        }
      }
      aggregate {
        count
      }
    }
  }
`;
export default enfermedadesQuery;