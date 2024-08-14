import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';

export default function CitaForm({ onClose }: { onClose: () => void }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const [cita, setCita] = React.useState({
    motivoConsulta: '',
    fechaHora: '',
    observaciones: '',
    cancelada: false,
  });
  const [estudio, setEstudio] = React.useState('');
  const [enfermedad, setEnfermedad] = React.useState('');
  const [paciente, setPaciente] = React.useState('');

  const steps = [
    'Datos de la Cita',
    'Datos del Estudio',
    'Datos de la Enfermedad',
    'Datos del Paciente',
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ cita, estudio, enfermedad, paciente });
    onClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Motivo de Consulta"
                name="motivoConsulta"
                value={cita.motivoConsulta}
                onChange={(e) =>
                  setCita({ ...cita, motivoConsulta: e.target.value })
                }
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="datetime-local"
                label="Fecha y Hora de la Consulta"
                type="datetime-local"
                value={cita.fechaHora}
                onChange={(e) =>
                  setCita({ ...cita, fechaHora: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observaciones"
                name="observaciones"
                value={cita.observaciones}
                onChange={(e) =>
                  setCita({ ...cita, observaciones: e.target.value })
                }
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cita.cancelada}
                    onChange={(e) =>
                      setCita({ ...cita, cancelada: e.target.checked })
                    }
                  />
                }
                label="Cancelada"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <TextField
            label="Estudio"
            value={estudio}
            onChange={(e) => setEstudio(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        );
      case 2:
        return (
          <TextField
            label="Enfermedad"
            value={enfermedad}
            onChange={(e) => setEnfermedad(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        );
      case 3:
        return (
          <TextField
            label="Paciente"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        );
      default:
        return <Typography>Step desconocido</Typography>;
    }
  };

  return (
    <Paper sx={{ width: '100%', height: '100%', padding: 3 }}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        onSubmit={handleSubmit}
      >
        <Stepper activeStep={activeStep} sx={{ marginBottom: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ flex: 1 }}>{renderStepContent(activeStep)}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ marginRight: 1 }}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
