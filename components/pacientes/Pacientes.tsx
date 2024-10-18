import * as React from "react";
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
  Snackbar,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PacienteForm from "./PacienteForm"; // Asegúrate de tener este componente
import { useElimiarPacienteLogMutation, useGetPacientesQuery } from "../../graphql/types";
import TableSkeleton from "../../utils/TableSkeleton";
import PacientesModal from "./pacienteModal";
import { useState } from "react";
import ConfirmarEliminacion from "../../utils/ConfirmarEliminacion";
import PacienteFormEdit from "./PacienteFormEditar"; // Asegúrate de tener este componente

const Pacientes: React.FC = () => {
  // State hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);
  const [eliminarPaciente, setEliminarPaciente] = useState<string | null>(null);
  const [pacienteIdEditar, setPacienteIdEditar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // GraphQL query to fetch patients
  const { data, loading, error, refetch } = useGetPacientesQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        dni: searchTerm,
        apellido_paciente: searchTerm,
        nombre_paciente: searchTerm,
      },
    },
  });

  const [eliminarPacienteLogMutation] = useElimiarPacienteLogMutation();

  const handleEliminarPaciente = async (pacienteId: string) => {
    try {
      await eliminarPacienteLogMutation({ variables: { pacienteId } });
      refetch();
      setSuccessSnackbar("Paciente eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el paciente:", error);
      setErrorSnackbar("Error al eliminar el paciente.");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (paciente: any) => {
    setSelectedPaciente(paciente);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPaciente(null);
  };

  const handleSnackbarClose = () => {
    setErrorSnackbar(null);
  };

  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbar(null);
  };

  const handleEditPaciente = (pacienteId: string) => {
    setPacienteIdEditar(pacienteId);
    setIsEditing(true); // Activa el modo de edición
    setShowForm(true); // Asegúrate de que el formulario se muestre
  };

  const handleCloseEdit = () => {
    setIsEditing(false); // Cierra el formulario de edición
    setPacienteIdEditar(null); // Limpia el ID del paciente a editar
    setShowForm(false); // Oculta el formulario si es necesario
  };

  if (loading) return <TableSkeleton rows={3} columns={5} />;
  if (error) {
    setErrorSnackbar(error.message);
    return null;
  }

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Gestión de Pacientes
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ marginBottom: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm((prev) => !prev)} // Alterna la visibilidad del formulario
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
            fontWeight: "bold",
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
              backgroundColor: "#f0f0f0",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Pacientes">
          <Badge badgeContent={data?.getPacientes.aggregate.count || 0} color="primary">
            <PersonIcon sx={{ color: "#1976d2" }} />
          </Badge>
        </Tooltip>
      </Stack>

      {showForm && (
        <Box
          sx={{
            marginBottom: 2,
            padding: 2,
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
          }}
        >
          <PacienteForm/> {/* Asegúrate de tener este componente */}
        </Box>
      )}
     {showForm && (
        <Box
          sx={{
            marginBottom: 2,
            padding: 2,
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
          }}
        >
       
        </Box>
      )}
      {isEditing && (
        <Box
          sx={{
            marginBottom: 2,
            padding: 2,
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
          }}
        >
          <PacienteFormEdit
            pacienteId={pacienteIdEditar}
            onClose={handleCloseEdit} // Cierra el formulario de edición
          />
        </Box>
      )}
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 1110 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {["DNI", "Nombre", "Apellido", "Edad", "Teléfono", "Acciones"].map((header) => (
                <TableCell key={header} sx={{ color: "white", fontWeight: "bold", padding: "6px 16px" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getPacientes?.edges.map((paciente, index) => (
              <TableRow
                key={paciente.node.id_paciente}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#f5f5f5",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  height: "48px",
                }}
              >
                <TableCell>{paciente.node.dni}</TableCell>
                <TableCell>{paciente.node.nombre_paciente}</TableCell>
                <TableCell>{paciente.node.apellido_paciente}</TableCell>
                <TableCell>{paciente.node.edad}</TableCell>
                <TableCell>{paciente.node.telefono}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton aria-label="visualizar" color="primary" onClick={() => handleOpenModal(paciente.node)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      aria-label="editar"
                      color="secondary"
                      onClick={() => handleEditPaciente(paciente.node.id_paciente)} // Cambia a modo de edición
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      aria-label="eliminar"
                      color="error"
                      onClick={() => setEliminarPaciente(paciente.node.id_paciente)} // Abre el diálogo de eliminación
                    >
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.getPacientes?.aggregate.count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Snackbar para mostrar errores */}
      <Snackbar open={Boolean(errorSnackbar)} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          {errorSnackbar}
        </Alert>
      </Snackbar>

      {/* Snackbar para mostrar éxitos */}
      <Snackbar open={Boolean(successSnackbar)} autoHideDuration={6000} onClose={handleSuccessSnackbarClose}>
        <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {successSnackbar}
        </Alert>
      </Snackbar>

      <PacientesModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        selectedPaciente={selectedPaciente}
      />    
     <ConfirmarEliminacion
    open={Boolean(eliminarPaciente)} // Controla la visibilidad del diálogo
    onClose={() => setEliminarPaciente(null)} // Cierra el diálogo
    onConfirmar={() => {
      handleEliminarPaciente(eliminarPaciente); // Llama a la función para eliminar
      setEliminarPaciente(null); // Resetea el estado
    }}
    mensaje="¿Estás seguro de que deseas eliminar este paciente?" // Mensaje de confirmación
    titulo="Confirmar Eliminación" // Título del diálogo
    disable={false} // Cambia esto según la lógica de carga
  />

      {/* Formulario de edición */}
      {isEditing && (
        <Box
          sx={{
            marginTop: 2,
            padding: 2,
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
          }}
        >
          <PacienteFormEdit
            pacienteId={pacienteIdEditar}
            onClose={handleCloseEdit} // Cierra el formulario de edición
          />
        </Box>
      )}
    </Box>
  );
};

export default Pacientes;
