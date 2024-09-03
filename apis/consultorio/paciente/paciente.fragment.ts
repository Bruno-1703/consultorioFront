import gql from "graphql-tag";

export default gql`
  fragment Paciente on Paciente {    
    dni 
    nombre_paciente   
    apellido_paciente
    edad
    altura
    telefono
    fecha_nacimiento
    sexo
    grupo_sanguineo
    alergias 
   
  }
`;
