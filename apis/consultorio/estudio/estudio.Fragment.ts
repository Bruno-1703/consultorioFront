import { gql } from "@apollo/client";

export default gql`
  fragment Estudio on Estudio {
    id_estudio
    fecha_realizacion
    tipo_estudio
    resultado
    codigo_referencia
    observaciones
    medico_solicitante
    urgente
  }
`;
