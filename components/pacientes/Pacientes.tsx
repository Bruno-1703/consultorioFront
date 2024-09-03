import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PacienteForm from './PacienteForm';
import { useGetPacientesQuery } from '../../graphql/types';

const Pacientes: React.FC = () => {
  const { data, loading, error } = useGetPacientesQuery({
    variables: {
      take: 10,
      skip: 0,
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Gestión de Pacientes
      </Typography>

      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ marginBottom: 2 }}>
        Registrar Paciente
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registrar Paciente</DialogTitle>
        <DialogContent>
          <PacienteForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>  
        </DialogActions>
      </Dialog>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginY: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginY: 2 }}>
          Error al cargar los pacientes: {error.message}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getPacientes?.edges.map((paciente) => (
              <TableRow key={paciente.node.id_paciente}>
                <TableCell>{paciente.node.dni}</TableCell>
                <TableCell>{paciente.node.nombre_paciente}</TableCell>
                <TableCell>{paciente.node.apellido_paciente}</TableCell>
                <TableCell>{paciente.node.edad}</TableCell>
                <TableCell>{paciente.node.altura}</TableCell>
                <TableCell>{paciente.node.telefono}</TableCell>
                <TableCell>{new Date(paciente.node.fecha_nacimiento).toLocaleDateString()}</TableCell>
                <TableCell>{paciente.node.sexo}</TableCell>
                <TableCell>{paciente.node.grupo_sanguineo}</TableCell>
                <TableCell>{paciente.node.alergias}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Pacientes;
