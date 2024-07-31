import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Define the type for a cita
interface Cita {
  id: number;
  nombre: string;
  fecha: string;
  detalles: string;
}

// Dummy data for 10 citas
const citas: Cita[] = [
  { id: 1, nombre: 'Cita 1', fecha: '2024-08-01', detalles: 'Detalles de la cita 1' },
  { id: 2, nombre: 'Cita 2', fecha: '2024-08-02', detalles: 'Detalles de la cita 2' },
  { id: 3, nombre: 'Cita 3', fecha: '2024-08-03', detalles: 'Detalles de la cita 3' },
  { id: 4, nombre: 'Cita 4', fecha: '2024-08-04', detalles: 'Detalles de la cita 4' },
  { id: 5, nombre: 'Cita 5', fecha: '2024-08-05', detalles: 'Detalles de la cita 5' },
  { id: 6, nombre: 'Cita 6', fecha: '2024-08-06', detalles: 'Detalles de la cita 6' },
  { id: 7, nombre: 'Cita 7', fecha: '2024-08-07', detalles: 'Detalles de la cita 7' },
  { id: 8, nombre: 'Cita 8', fecha: '2024-08-08', detalles: 'Detalles de la cita 8' },
  { id: 9, nombre: 'Cita 9', fecha: '2024-08-09', detalles: 'Detalles de la cita 9' },
  { id: 10, nombre: 'Cita 10', fecha: '2024-08-10', detalles: 'Detalles de la cita 10' },
];

const Medicamentos: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Motivo Consulta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {citas.map((cita) => (
            <TableRow key={cita.id}>
              <TableCell>{cita.id}</TableCell>
              <TableCell>{cita.nombre}</TableCell>
              <TableCell>{cita.fecha}</TableCell>
              <TableCell>{cita.detalles}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Medicamentos;
