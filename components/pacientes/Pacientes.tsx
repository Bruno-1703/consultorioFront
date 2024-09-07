import * as React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress, 
  Alert, 
  Typography, 
  Box, 
  Button, 
  TextField, 
  TablePagination, 
  IconButton, 
  Stack,
  Badge,
  Tooltip,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PacienteForm from './PacienteForm';
import { useGetPacientesQuery } from '../../graphql/types';
import PacientesDrawer from './pacienteDrawer';

const Pacientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showForm, setShowForm] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedPaciente, setSelectedPaciente] = React.useState<any>(null); // Asegúrate de usar el tipo adecuado

  const { data, loading, error, refetch } = useGetPacientesQuery({
    variables: {
      take: rowsPerPage,
      skip: page * rowsPerPage,
      where: { dni: searchTerm, apellido_paciente: searchTerm, nombre_paciente: searchTerm }
    },
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page when search term changes
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDrawer = (paciente: any) => {
    setSelectedPaciente(paciente);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPaciente(null);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
       <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
      Gestión de Pacientes
    </Typography>
  </Stack>

  <Stack direction="row" spacing={2} sx={{ marginBottom: 2, alignItems: 'center' }}>
    <Button
      variant="contained"
      color="primary"
      onClick={() => setShowForm(!showForm)}
      sx={{
        backgroundColor: '#1976d2',
        '&:hover': {
          backgroundColor: '#115293',
        },
        fontWeight: 'bold',
        paddingX: 2,
      }}
    >
      {showForm ? "Ocultar Formulario" : "Registrar Paciente"}
    </Button>
    <TextField
      label="Buscar por Nombre"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
      sx={{ flexGrow: 1 }}
    />
    <Tooltip title="Refrescar">
      <IconButton
        onClick={() => refetch()}
        color="secondary"
        sx={{
          borderRadius: 1,
          backgroundColor: '#f0f0f0',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        }}
      >
        <RefreshIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Pacientes">
      <Badge badgeContent={data?.getPacientes.aggregate.count || 0} color="primary">
        <PersonIcon sx={{ color: '#1976d2' }} />
      </Badge>
    </Tooltip>
  </Stack>
      {showForm && (
        <Box sx={{ marginBottom: 2, padding: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
          <PacienteForm />
        </Box>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginY: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginY: 3 }}>
          Error al cargar los pacientes: {error.message}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', padding: '6px 16px' }}>DNI</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', padding: '6px 16px' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', padding: '6px 16px' }}>Apellido</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', padding: '6px 16px' }}>Edad</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', padding: '6px 16px' }}>Teléfono</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', padding: '6px 16px' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getPacientes?.edges.map((paciente, index) => (
              <TableRow
                key={paciente.node.id_paciente}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                  height: '48px',
                }}
              >
                <TableCell>{paciente.node.dni}</TableCell>
                <TableCell>{paciente.node.nombre_paciente}</TableCell>
                <TableCell>{paciente.node.apellido_paciente}</TableCell>
                <TableCell>{paciente.node.edad}</TableCell>
                <TableCell>{paciente.node.telefono}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton aria-label="visualizar" color="primary" onClick={() => handleOpenDrawer(paciente.node)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton aria-label="editar" color="secondary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton aria-label="eliminar" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data?.getPacientes.aggregate.count || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          marginTop: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          boxShadow: 1,
        }}
      />

      {/* Aquí se agrega el Drawer */}
      <PacientesDrawer
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        selectedPaciente={selectedPaciente}
      />
    </Box>
  );
};

export default Pacientes;
