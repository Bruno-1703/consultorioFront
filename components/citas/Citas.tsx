import * as React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
  Button,
  TextField,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import BarraGenerica from '../../utils/BarraGeneriaca';

interface Cita {
  id_cita: string;
  motivoConsulta: string;
  fechaSolicitud: string;
  fechaModificacion?: string;
  hora: string;
  duracion: string;
  observaciones?: string;
  cancelada: boolean;
  estado: 'confirmada' | 'pendiente' | 'cancelada' | 'completada';
  enfermedad: {
    id_enfermedad: string;
    nombre_enf: string;
    fecha: string;
  }[];
  medicamento: {
    id_medicamento: string;
    nombre_med?: string;
  }[];
  estudio: {
    id_estudio: string;
    fecha_realizacion: string;
    codigo_referencia: string;
  }[];
}

export const citas: Cita[] = [
  {
    id_cita: '1',
    motivoConsulta: 'Consulta general',
    fechaSolicitud: '2024-08-01',
    fechaModificacion: '2024-08-02',
    estado: 'confirmada',
    hora: '09:00',
    duracion: '30 min',
    observaciones: 'Ninguna',
    cancelada: false,
    enfermedad: [
      { id_enfermedad: 'enf1', nombre_enf: 'Gripe', fecha: '2024-08-01' },
    ],
    medicamento: [{ id_medicamento: 'med1', nombre_med: 'Paracetamol' }],
    estudio: [
      {
        id_estudio: 'est1',
        fecha_realizacion: '2024-08-01',
        codigo_referencia: 'A123',
      },
    ],
  },
  {
    id_cita: '2',
    motivoConsulta: 'Consulta general',
    fechaSolicitud: '2024-07-01',
    fechaModificacion: '2024-08-02',
    hora: '10:00',
    duracion: '45 min',
    estado: 'cancelada',
    observaciones: 'URGENTE',
    cancelada: false,
    enfermedad: [
      { id_enfermedad: 'enf1', nombre_enf: 'COVID-19', fecha: '2024-07-12' },
    ],
    medicamento: [{ id_medicamento: 'med1', nombre_med: 'Paracetamol' }],
    estudio: [
      {
        id_estudio: 'PLACA',
        fecha_realizacion: '2024-07-08',
        codigo_referencia: 'A123',
      },
    ],
  },
  // Otros registros de ejemplo
];

function Row({ row }: { row: Cita }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
    {/* <BarraGenerica onRefresh={} onSearchChange={" hola "}/> */}
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          backgroundColor: open ? '#f5f5f5' : 'inherit',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              padding: 1,
              borderRadius: '50%',
              border: '1px solid #ccc',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.motivoConsulta}
        </TableCell>
        <TableCell>{row.fechaSolicitud}</TableCell>
        <TableCell>
          <Chip
            label={row.estado}
            color={
              row.estado === 'confirmada'
                ? 'success'
                : row.estado === 'pendiente'
                ? 'warning'
                : row.estado === 'cancelada'
                ? 'error'
                : 'default'
            }
            size="small"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles de la Cita
              </Typography>
              <Typography variant="body2">
                {`Motivo: ${row.motivoConsulta}`}
              </Typography>
              <Typography variant="body2">
                {`Observaciones: ${row.observaciones || 'Ninguna'}`}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Enfermedades
              </Typography>
              {row.enfermedad.length > 0 ? (
                row.enfermedad.map((enf) => (
                  <Typography key={enf.id_enfermedad} variant="body2">
                    {`Nombre: ${enf.nombre_enf}, Fecha: ${enf.fecha}`}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">
                  No hay enfermedades relacionadas.
                </Typography>
              )}
              <Typography variant="h6" gutterBottom component="div">
                Medicamentos
              </Typography>
              {row.medicamento.length > 0 ? (
                row.medicamento.map((med) => (
                  <Typography key={med.id_medicamento} variant="body2">
                    {`Nombre: ${med.nombre_med || 'Sin nombre'}`}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">
                  No hay medicamentos relacionados.
                </Typography>
              )}
              <Typography variant="h6" gutterBottom component="div">
                Estudios
              </Typography>
              {row.estudio.length > 0 ? (
                row.estudio.map((est) => (
                  <Typography key={est.id_estudio} variant="body2">
                    {`Fecha: ${est.fecha_realizacion}, Código: ${est.codigo_referencia}`}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">
                  No hay estudios relacionados.
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function CitaForm() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [cancelada, setCancelada] = React.useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Button
        onClick={toggleForm}
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ marginBottom: 2 }}
      >
        Añadir Cita
      </Button>

      <Collapse in={isFormOpen}>
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Formulario de Cita
          </Typography>

          <TextField
            label="Motivo de Consulta"
            name="motivoConsulta"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Hora"
            name="hora"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Observaciones"
            name="observaciones"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />

          <FormControlLabel
            control={<Checkbox checked={cancelada} onChange={(e) => setCancelada(e.target.checked)} />}
            label="Cancelada"
          />

          <TextField
            label="Enfermedad"
            name="enfermedad"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Medicamento"
            name="medicamento"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Estudio"
            name="estudio"
            fullWidth
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Guardar
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
}

export default function CollapsibleTable() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <CitaForm />
      <TableContainer
        component={Paper}
        sx={{ width: '100%', flexGrow: 1, overflow: 'auto' }}
      >
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Motivo Consulta</TableCell>
              <TableCell>Fecha Solicitud</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citas.map((cita) => (
              <Row key={cita.id_cita} row={cita} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
