import gql from "graphql-tag";

export default gql`
mutation createEnfermedad($data: EnfermedadInput!) {
  createEnfermedad(data: $data)
}

`;
