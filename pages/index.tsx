import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Container, Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Citas from "../components/citas/Citas";
import { FormularioCita } from '../components/citas/FormularioCita';

const IndexPage: React.FC = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const toggleDialog = (open: boolean) => () => {
    setDialogOpen(open);
  };

  return (
    <div style={{ display: "flex", background: "#f5f5f5", color: "#333", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom style={{ color: "#007bff", textAlign: 'center' }}>
          Bienvenidos al consultorio médico 👩‍⚕️👨‍⚕️
        </Typography>

        {/* Componente combinado de "Hora actual" e "Información del consultorio" */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              style={{
                padding: "16px",
                background: "#ffffff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                color: "#333",
                height: "100%"
              }}
            >
              <Typography variant="h6" gutterBottom style={{ color: "#007bff" }}>
                Hora actual
              </Typography>
              <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                {new Date().toLocaleString()}
              </Typography>

              <hr style={{ margin: "16px 0", borderColor: "#e0e0e0" }} />

              <Typography variant="h6" gutterBottom style={{ color: "#007bff" }}>
                Información del consultorio
              </Typography>
              <Typography variant="body1" style={{ fontSize: '1rem' }}>
                Dirección: Calle AV Pancho Ramirez S/N, Ciudad Sauce De Luna
              </Typography>
              <Typography variant="body1" style={{ fontSize: '1rem' }}>
                Teléfono: +123 456 7890
              </Typography>
              <Typography variant="body1" style={{ fontSize: '1rem' }}>
                Horario: Lunes a Sábado, 8:00 a 12:00 AM - 16:00 a 21:00 PM
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Botón para abrir el Dialog */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={toggleDialog(true)} 
          style={{ marginTop: "24px", padding: "12px 24px", fontSize: "1rem" }}
        >
          Agregar Cita
        </Button>

        {/* Dialog para el FormularioCita */}
        <Dialog open={dialogOpen} onClose={toggleDialog(false)}>
          <DialogTitle>Agregar Cita</DialogTitle>
          <DialogContent>
            <FormularioCita onClose={toggleDialog(false)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleDialog(false)} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Sección de Calendario y Citas con límite de altura */}
          <Grid item xs={12} md={6}>
            <Paper
              style={{
                padding: "16px",
                background: "#ffffff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                color: "#333",
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" gutterBottom style={{ color: "#007bff" }}>
                Calendario de citas
              </Typography>
              <div style={{ flex: 1, overflow: 'auto' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    sx={{
                      '& .MuiDateCalendar-root': {
                        border: 'none',
                        boxShadow: 'none',
                      },
                      '& .MuiDateCalendar-root:focus': {
                        border: 'none',
                        boxShadow: 'none',
                      }
                    }}
                  />
                </LocalizationProvider>
              </div>
              <Typography variant="body1" style={{ marginTop: "16px", color: "#666", fontSize: '1rem' }}>
                Citas para el día: {value?.format('DD/MM/YYYY')}
              </Typography>
            </Paper>

          <Grid item xs={12} md={6}>
            <Paper
              style={{
                padding: "16px",
                background: "#ffffff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                color: "#333",
                display: 'flex',
              }}
            >
              <Typography variant="h6" gutterBottom style={{ color: "#007bff" }}>
                Lista de Citas
              </Typography>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <Citas fecha={value} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default IndexPage;
