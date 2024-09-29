import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Badge,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Drawer,
  Divider,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { useGetMedicamentosQuery } from "../../graphql/types";

const Medicamentos: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showForm, setShowForm] = React.useState(false);
  const [selectedMedicamento, setSelectedMedicamento] =
    React.useState<any>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const { data, loading, error, refetch } = useGetMedicamentosQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        nombre_med: searchTerm,
        // Otros filtros opcionales para buscar medicamentos
      },
    },
  });

  console.log(data);
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

  const handleViewDetails = (medicamento: any) => {
    setSelectedMedicamento(medicamento);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedMedicamento(null);
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Gestión de Medicamentos
        </Typography>
        <Badge
          badgeContent={data?.getMedicamentos.aggregate.count || 0}
          color="primary"
        >
          <PersonIcon sx={{ color: "#1976d2" }} />
        </Badge>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: 2, alignItems: "center" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(!showForm)}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#115293",
            },
            fontWeight: "bold",
            paddingX: 2,
          }}
        >
          {showForm ? "Ocultar Formulario" : "Registrar Medicamento"}
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
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
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
          {/* Aquí iría el componente de formulario para medicamentos */}
        </Box>
      )}

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginY: 3 }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginY: 3 }}>
          Error al cargar los medicamentos: {error.message}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", padding: "6px 16px" }}
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", padding: "6px 16px" }}
              >
                Marca
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", padding: "6px 16px" }}
              >
                Fecha de Vencimiento
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", padding: "6px 16px" }}
              >
                Dosis
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold", padding: "6px 16px" }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getMedicamentos?.edges.map((medicamento, index) => (
              <TableRow
                key={medicamento.node.id_medicamento}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#f5f5f5",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  height: "48px",
                }}
              >
                <TableCell>{medicamento.node.nombre_med}</TableCell>
                <TableCell>{medicamento.node.marca}</TableCell>
                <TableCell>
                  {new Date(
                    medicamento.node.fecha_vencimiento
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell>{medicamento.node.dosis_hs}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton
                      aria-label="visualizar"
                      color="primary"
                      onClick={() => handleViewDetails(medicamento.node)}
                    >
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
        count={data?.getMedicamentos.aggregate.count || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          marginTop: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
          boxShadow: 1,
        }}
      />

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          width: 400,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 400,
            boxSizing: "border-box",
            padding: 3,
            backgroundColor: "#fff",
            borderRadius: 2,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Detalles del Medicamento
          </Typography>
          <IconButton onClick={handleCloseDrawer} color="inherit">
            {/* <CloseIcon /> */}
          </IconButton>
        </Stack>
        <Divider sx={{ marginY: 2 }} />
        {selectedMedicamento && (
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Nombre:
            </Typography>
            <Typography variant="body2">
              {selectedMedicamento.nombre_med}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: 1 }}
            >
              Marca:
            </Typography>
            <Typography variant="body2">{selectedMedicamento.marca}</Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: 1 }}
            >
              Fecha de Vencimiento:
            </Typography>
            <Typography variant="body2">
              {new Date(
                selectedMedicamento.fecha_vencimiento
              ).toLocaleDateString()}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: 1 }}
            >
              Dosis:
            </Typography>
            <Typography variant="body2">
              {selectedMedicamento.dosis_hs}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: 1 }}
            >
              Agente Principal:
            </Typography>
            <Typography variant="body2">
              {selectedMedicamento.agente_principal}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: 1 }}
            >
              Efectos Secundarios:
            </Typography>
            <Typography variant="body2">
              {selectedMedicamento.efectos_secundarios}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: 1 }}
            >
              Lista Negra:
            </Typography>
            <Typography variant="body2">
              {selectedMedicamento.lista_negra ? "Sí" : "No"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: 1 }}
            >
              Categoría:
            </Typography>
            <Typography variant="body2">
              {selectedMedicamento.categoria}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: 1 }}
            >
              Contraindicaciones:
            </Typography>
            <Typography variant="body2">
              {selectedMedicamento.contraindicaciones}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: 1 }}
            >
              Prescripción Requerida:
            </Typography>
            <Typography variant="body2">
              {selectedMedicamento.prescripcion_requerida ? "Sí" : "No"}
            </Typography>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default Medicamentos;
