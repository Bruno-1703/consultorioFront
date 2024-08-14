import gql from "graphql-tag";
const estudiossQuery = gql`
  query GetEstudio($id: String!) {
    getEstudio(id: $id) {
      id_estudio
  
    }
`;