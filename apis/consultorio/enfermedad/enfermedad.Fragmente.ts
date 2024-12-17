import { gql } from "@apollo/client";

export default gql`
  fragment Enfermedad on Enfermedad {
    id_enfermedad
    nombre_enf
    sintomas
    gravedad

  }
`;
