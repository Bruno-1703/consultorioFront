import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Container, Grid, Paper, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Citas from "../components/citas/Citas";

const IndexPage: React.FC = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  return (
    <div style={{ display: "flex", background: "#f5f5f5", color: "#333", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom style={{ color: "#007bff", textAlign: 'center' }}>
          Bienvenidos al consultorio médico 👩‍⚕️👨‍⚕️
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
              <Typography variant="body1">
                {new Date().toLocaleString()}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
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
                Información del consultorio
              </Typography>
              <Typography variant="body1">
                Dirección: Calle AV Pancho Ramirez S/N, Ciudad Sauce De Luna
              </Typography>
              <Typography variant="body1">
                Teléfono: +123 456 7890
              </Typography>
              <Typography variant="body1">
                Horario: Lunes a Sábado, 8:00 a 12:00 AM - 16:00 a 21:00 PM
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ marginTop: "24px" }}>
          <Grid item xs={12} md={6}>
            <Paper
              style={{
                padding: "16px",
                background: "#ffffff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                color: "#333",
                height: "100%",
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
                      // Aplicar estilos al contenedor del calendario
                      '& .MuiDateCalendar-root': {
                        border: 'none',
                        boxShadow: 'none',
                      },
                      // Añadir estilos cuando el calendario está enfocado
                      '& .MuiDateCalendar-root:focus': {
                        border: 'none',
                        boxShadow: 'none',
                      }
                    }}
                  />
                </LocalizationProvider>
              </div>
              <Typography variant="body1" style={{ marginTop: "16px", color: "#666" }}>
                Citas para el día: {value?.format('DD/MM/YYYY')}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              style={{
                padding: "16px",
                background: "#ffffff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                color: "#333",
                height: "100%",
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" gutterBottom style={{ color: "#007bff" }}>
                Lista de Citas
              </Typography>
              <Citas fecha={value} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default IndexPage;
