import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Define the type for a Cita
interface Cita {
  id_cita?: string;
  motivoConsulta: string;
  fechaSolicitud: Date;
  observaciones?: string;
  cancelada?: boolean;
}

// Define the type for a Paciente
interface Paciente {
  id_paciente?: string;
  dni: string;
  nombre_paciente: string;
  apellido_paciente: string;
  edad: number;
  altura?: number;
  telefono: string;
  fecha_nacimiento: Date;
  sexo: string;
  grupo_sanguineo: string;
  alergias?: string;
  citas?: Cita[];
}

// Dummy data for pacientes
const pacientes: Paciente[] = [
  {
    id_paciente: '001',
    dni: '12345678',
    nombre_paciente: 'Juan',
    apellido_paciente: 'Pérez',
    edad: 30,
    altura: 170,
    telefono: '123-456-7890',
    fecha_nacimiento: new Date('1994-01-01'),
    sexo: 'Masculino',
    grupo_sanguineo: 'O+',
    alergias: 'Penicilina',
    citas: [
      {
        id_cita: '1',
        motivoConsulta: 'Revisión general',
        fechaSolicitud: new Date('2024-08-01'),
        observaciones: 'Ninguna',
        cancelada: false,
      },
    ],
  },
  {
    id_paciente: '002',
    dni: '87654321',
    nombre_paciente: 'María',
    apellido_paciente: 'Gómez',
    edad: 25,
    altura: 160,
    telefono: '098-765-4321',
    fecha_nacimiento: new Date('1999-02-14'),
    sexo: 'Femenino',
    grupo_sanguineo: 'A-',
    alergias: 'Ninguna',
    citas: [
      {
        id_cita: '2',
        motivoConsulta: 'Dolor de cabeza',
        fechaSolicitud: new Date('2024-08-02'),
        observaciones: 'Migraña frecuente',
        cancelada: false,
      },
    ],
  },
  // Puedes añadir más pacientes según sea necesario...
];

const Pacientes: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>DNI</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Altura</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell>Grupo Sanguíneo</TableCell>
            <TableCell>Alergias</TableCell>
            <TableCell>Citas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pacientes.map((paciente) => (
            <TableRow key={paciente.id_paciente}>
              <TableCell>{paciente.id_paciente}</TableCell>
              <TableCell>{paciente.dni}</TableCell>
              <TableCell>{paciente.nombre_paciente}</TableCell>
              <TableCell>{paciente.apellido_paciente}</TableCell>
              <TableCell>{paciente.edad}</TableCell>
              <TableCell>{paciente.altura}</TableCell>
              <TableCell>{paciente.telefono}</TableCell>
              <TableCell>{paciente.fecha_nacimiento.toLocaleDateString()}</TableCell>
              <TableCell>{paciente.sexo}</TableCell>
              <TableCell>{paciente.grupo_sanguineo}</TableCell>
              <TableCell>{paciente.alergias}</TableCell>
              <TableCell>
                {paciente.citas?.map((cita, index) => (
                  <div key={index}>
                    {cita.motivoConsulta} ({cita.fechaSolicitud.toLocaleDateString()})
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Pacientes;
