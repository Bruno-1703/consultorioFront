import { PropsWithChildren } from 'react';
import { styled } from '@mui/material';

const StyledMain = styled('main')`
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  width: 100vw;  /* Ocupa todo el ancho de la pantalla */
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 20px;
  
  background-color: #f5f5f5; /* Color de fondo neutro */
  color: #333; /* Color de texto oscuro para buen contraste */
  
  box-shadow: none; /* Eliminamos las sombras fuertes */
  border: 1px solid #ddd; /* Bordes sutiles para definir los límites */
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out; /* Transiciones suaves solo en color de fondo y borde */

  @media (max-width: 768px) {
    padding: 10px; /* Padding adaptativo para pantallas más pequeñas */
  }

  &:hover {
    background-color: #eaeaea; /* Cambio suave de fondo en hover */
    border-color: #ccc; /* Cambio suave del color del borde */
  }
`;

export const Main = ({ children }: PropsWithChildren<unknown>) => (
  <StyledMain>
    {children}
  </StyledMain>
);
