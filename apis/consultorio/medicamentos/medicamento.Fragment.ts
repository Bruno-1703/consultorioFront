import { gql } from "@apollo/client";

export default gql`
  fragment Medicamento on Medicamento {    
    nombre_med
    marca
    fecha_vencimiento
    dosis_hs
    agente_principal
    efectos_secundarios
    lista_negra
    categoria
    contraindicaciones
    prescripcion_requerida
  }
`;
