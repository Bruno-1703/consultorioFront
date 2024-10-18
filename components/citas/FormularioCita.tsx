import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  CitaInput,
  PacienteCitaInput,
  useCreateCitaMutation,
  useGetPacientesQuery,
} from "../../graphql/types";
interface FormularioCitaProps {
  onClose: () => void; // Define la propiedad onClose
}
export const FormularioCita = ({ onClose }) => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [selectedPaciente, setSelectedPaciente] =
    useState<PacienteCitaInput | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);

  const { data: pacientesData, loading: pacientesLoading, error: pacientesError, fetchMore } = useGetPacientesQuery({
    variables: { limit, skip, where: {} },
  });

  const [createCitaMutation, { loading, error }] = useCreateCitaMutation();

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const citaForm: CitaInput = {
        motivoConsulta,
        observaciones,
        fechaSolicitud,
      };
      const pacienteForm: PacienteCitaInput = {
        id_paciente: selectedPaciente?.id_paciente || "",
        dni: selectedPaciente?.dni || "",
        nombre_paciente: selectedPaciente?.nombre_paciente || "",
      };

      await createCitaMutation({
        variables: { data: citaForm, paciente: pacienteForm },
      });

      // Mostrar mensaje de éxito y resetear el formulario
      setShowSuccessAlert(true);
      resetForm();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setShowErrorAlert(true);
    }
  };

  const resetForm = () => {
    setMotivoConsulta("");
    setObservaciones("");
    setFechaSolicitud("");
    setSelectedPaciente(null);
  };

  const loadMorePacientes = async () => {
    await fetchMore({
      variables: {
        limit,
        skip: skip + limit,
      },
    });
    setSkip(skip + limit);
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom && !pacientesLoading) {
      loadMorePacientes();
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Collapse in={isFormOpen}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Formulario de Cita
          </Typography>

          <TextField
            label="Motivo de Consulta"
            fullWidth
            margin="normal"
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
          />

          <TextField
            label="Fecha y Hora"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={fechaSolicitud}
            onChange={(e) => setFechaSolicitud(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Observaciones"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="paciente-label">Seleccionar Paciente</InputLabel>
            <Select
              labelId="paciente-label"
              id="paciente"
              value={selectedPaciente ? selectedPaciente.id_paciente : ""}
              onChange={(e) => {
                const paciente = pacientesData?.getPacientes.edges.find(
                  ({ node }: any) => node.id_paciente === e.target.value
                )?.node;

                if (paciente && paciente.id_paciente) {
                  setSelectedPaciente(paciente as PacienteCitaInput);
                }
              }}
              label="Seleccionar Paciente"
              disabled={pacientesLoading || !!pacientesError}
              onScroll={handleScroll}
            >
              {pacientesData?.getPacientes.edges.map(({ node }: any) => (
                <MenuItem key={node.id_paciente} value={node.id_paciente}>
                  {node.nombre_paciente} {node.apellido_paciente}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {pacientesLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={pacientesLoading || loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </Box>
      </Collapse>

      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={4000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccessAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Cita creada con éxito!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showErrorAlert}
        autoHideDuration={4000}
        onClose={() => setShowErrorAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowErrorAlert(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error al crear la cita.
        </Alert>
      </Snackbar>
    </Box>
  );
};
