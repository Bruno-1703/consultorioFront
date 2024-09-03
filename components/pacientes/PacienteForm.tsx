import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Collapse,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PacienteInput, useCreatePacienteMutation } from "../../graphql/types";

export default function PacienteForm() {
  const [openForm, setOpenForm] = useState(false);
  const [dni, setDni] = useState("");
  const [nombre_paciente, setNombrePaciente] = useState("");
  const [apellido_paciente, setApellidoPaciente] = useState("");
  const [edad, setEdad] = useState("");
  const [altura, setAltura] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [grupo_sanguineo, setGrupoSanguineo] = useState("");
  const [alergias, setAlergias] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [createPacienteMutation] = useCreatePacienteMutation();

  const [errors, setErrors] = useState({
    dni: false,
    nombre_paciente: false,
    apellido_paciente: false,
    fechaNacimiento: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      dni: !dni,
      nombre_paciente: !nombre_paciente,
      apellido_paciente: !apellido_paciente,
      fechaNacimiento: !fechaNacimiento,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return; // No enviar el formulario si hay errores
    }

    const pacienteIntp: PacienteInput = {
      dni,
      apellido_paciente,
      nombre_paciente,
      edad: parseInt(edad, 10),
      altura: parseFloat(altura),
      telefono,
      fecha_nacimiento: fechaNacimiento,
      sexo,
      grupo_sanguineo,
      alergias,
    };

    try {
      await createPacienteMutation({
        variables: {
          data: pacienteIntp,
        },
      });
      setSuccessMessage("Paciente creado exitosamente");
      resetForm();
    } catch (error) {
      console.error("Error al crear paciente:", error);
    }
  };

  const resetForm = () => {
    setDni("");
    setNombrePaciente("");
    setApellidoPaciente("");
    setFechaNacimiento("");
    setEdad("");
    setAltura("");
    setTelefono("");
    setSexo("");
    setGrupoSanguineo("");
    setAlergias("");
    setOpenForm(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(!openForm)}
        sx={{ marginBottom: 2 }}
      >
        {openForm ? "Cerrar Formulario" : "Agregar Paciente"}
      </Button>
      <Collapse in={openForm}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#f9f9f9",
            padding: 3,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Registrar Paciente
          </Typography>
          <TextField
            label="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            fullWidth
            margin="normal"
            required
            error={errors.dni}
            helperText={errors.dni ? "El DNI es obligatorio" : ""}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <TextField
            label="Nombre"
            value={nombre_paciente}
            onChange={(e) => setNombrePaciente(e.target.value)}
            fullWidth
            margin="normal"
            required
            error={errors.nombre_paciente}
            helperText={errors.nombre_paciente ? "El nombre es obligatorio" : ""}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <TextField
            label="Apellido"
            value={apellido_paciente}
            onChange={(e) => setApellidoPaciente(e.target.value)}
            fullWidth
            margin="normal"
            required
            error={errors.apellido_paciente}
            helperText={errors.apellido_paciente ? "El apellido es obligatorio" : ""}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <TextField
            label="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <TextField
            label="Altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <TextField
            label="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <TextField
            label="Fecha de Nacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            fullWidth
            margin="normal"
            required
            error={errors.fechaNacimiento}
            helperText={errors.fechaNacimiento ? "La fecha de nacimiento es obligatoria" : ""}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="sexo-label">Sexo</InputLabel>
            <Select
              labelId="sexo-label"
              id="sexo"
              value={sexo}
              onChange={(e) => setSexo(e.target.value as string)}
              label="Sexo"
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Femenino">Femenino</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="grupo-sanguineo-label">Grupo Sanguíneo</InputLabel>
            <Select
              labelId="grupo-sanguineo-label"
              id="grupoSanguineo"
              value={grupo_sanguineo}
              onChange={(e) => setGrupoSanguineo(e.target.value as string)}
              label="Grupo Sanguíneo"
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Alergias"
            value={alergias}
            onChange={(e) => setAlergias(e.target.value)}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Guardar
          </Button>
        </Box>
      </Collapse>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
