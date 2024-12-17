import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

interface EnfermedadFormProps {
  onSubmit: (formData: { nombre_enf: string; sintomas: string; gravedad: string }) => void;
  onClose: () => void;
  defaultValues?: {
    nombre_enf?: string;
    sintomas?: string;
    gravedad?: string;
  };
}

const EnfermedadForm: React.FC<EnfermedadFormProps> = ({ onSubmit, onClose, defaultValues = {} }) => {
  const [formData, setFormData] = React.useState({
    nombre_enf: defaultValues.nombre_enf || "",
    sintomas: defaultValues.sintomas || "",
    gravedad: defaultValues.gravedad || "Leve",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        {defaultValues.nombre_enf ? "Editar Enfermedad" : "Registrar Enfermedad"}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Nombre de la Enfermedad"
          name="nombre_enf"
          value={formData.nombre_enf}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <TextField
          label="Síntomas"
          name="sintomas"
          value={formData.sintomas}
          onChange={handleInputChange}
          required
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          select
          label="Gravedad"
          name="gravedad"
          value={formData.gravedad}
          onChange={handleInputChange}
          required
          fullWidth
        >
          {["Leve", "Moderada", "Grave"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "flex-end" }}>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {defaultValues.nombre_enf ? "Guardar Cambios" : "Registrar"}
        </Button>
      </Stack>
    </Box>
  );
};

export default EnfermedadForm;
