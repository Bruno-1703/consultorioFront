import { gql } from "@apollo/client";

export default gql`
    fragment Estudio on Estudio {
    
    fecha_realizacion
    tipo_estudio
    resultado
    codigo_referencia
    observaciones
    medico_solicitante
    urgente
  }
`;
