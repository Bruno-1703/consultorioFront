import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Tooltip,
  IconButton,
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
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetCitasQuery } from "../graphql/types";
import PersonaSelector from "../utils/SelectorUsuarios";

const HistoriasPaciente: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedPersona, setSelectedPersona] = React.useState<string | null>(
    null
  );

  const { data, loading, error, refetch } = useGetCitasQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
         buscar: searchTerm,
        paciente: {
          dni: selectedPersona
        }
        
        },
    },
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
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

  return (
    <Box sx={{ padding: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Historias del Paciente
        </Typography>
        <Tooltip title="Refrescar">
          <IconButton onClick={() => refetch()} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <PersonaSelector
        value={selectedPersona}
        onChange={(value) => setSelectedPersona(value)}
      />
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <TextField
          label="Buscar por Motivo de Consulta"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />
      </Stack>

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
          Error al cargar las historias: {error.message}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Motivo de Consulta
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Diagnóstico</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tratamiento</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getCitas.edges?.map((historia, index) => (
              <TableRow key={historia.node?.id_cita} sx={{ height: "48px" }}>
                <TableCell>
                  {new Date(historia.node.fechaSolicitud).toLocaleDateString()}
                </TableCell>
                <TableCell>{historia.node.motivoConsulta}</TableCell>
                <TableCell>{historia.node.observaciones}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton color="secondary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error">
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
        count={data?.getCitas.aggregate.count || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ marginTop: 2 }}
      />
    </Box>
  );
};

export default HistoriasPaciente;
