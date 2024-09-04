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
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  TablePagination, 
  IconButton, 
  Stack,
  Badge,
  Tooltip,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PacienteForm from './PacienteForm';
import { useGetPacientesQuery } from '../../graphql/types';

const Pacientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const { data, loading, error, refetch } = useGetPacientesQuery({
    variables: {
      take: rowsPerPage,
      skip: page * rowsPerPage,
      where: { nombre_paciente:  searchTerm } 
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    setPage(0); // Reset page when rows per page changes
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Gestión de Pacientes
        </Typography>
        <Badge badgeContent={data?.getPacientes.aggregate.count || 0} color="primary">
          <NotificationsIcon sx={{ color: '#1976d2' }} />
        </Badge>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#115293',
            },
            fontWeight: 'bold',
            paddingX: 2,
          }}
        >
          Registrar Paciente
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
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
          Registrar Paciente
        </DialogTitle>
        <DialogContent sx={{ padding: 2 }}>
          <PacienteForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>  
        </DialogActions>
      </Dialog>

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

      <TableContainer component={Paper} sx={{ marginTop: 3, boxShadow: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DNI</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Apellido</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Edad</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Altura</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Teléfono</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha de Nacimiento</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sexo</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Grupo Sanguíneo</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Alergias</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getPacientes?.edges.map((paciente, index) => (
              <TableRow 
                key={paciente.node.id_paciente} 
                sx={{ 
                  height: 40,
                  backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5', 
                  '&:hover': { backgroundColor: '#e0e0e0' } 
                }}
              >
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
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton aria-label="visualizar" color="primary">
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
          marginTop: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          boxShadow: 1,
        }}
      />
    </Box>
  );
};

export default Pacientes;
