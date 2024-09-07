import {
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CollapsibleTable from "../components/citas/Citas";

const IndexPage: React.FC = () => {
  // Obtener la fecha actual
  const hoy = new Date().toISOString().split("T")[0];

  const [date, setDate] = React.useState(new Date());

  const onDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const fecha = date?.toLocaleDateString() || "";

  return (
    <div style={{ display: "flex", background: "#f5f5f5", color: "#333", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom style={{ color: "#007bff", textAlign: 'center' }}>
          Bienvenidos al consultorio médico 👩‍⚕️👨‍⚕️
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              style={{
                padding: "16px",
                background: "#ffffff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                color: "#333",
              }}
            >
              <Typography variant="h6" gutterBottom style={{ color: "#007bff" }}>
                Calendario de citas
              </Typography>
              <Calendar
                onChange={onDateChange}
                value={date}
                className="react-calendar"
              />
              <Typography variant="body1" style={{ marginTop: "16px", color: "#666" }}>
                Citas para el día: {fecha}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              style={{
                padding: "16px",
                background: "#ffffff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                color: "#333",
              }}
            >
              <Typography variant="h6" gutterBottom style={{ color: "#007bff" }}>
                Hora actual
              </Typography>
              <Typography variant="body1">
                {new Date().toLocaleString()}
              </Typography>
            </Paper>
            <Paper
              style={{
                padding: "16px",
                marginTop: "16px",
                background: "#ffffff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                color: "#333",
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
          <Grid item xs={12}>
            <CollapsibleTable children={fecha} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default IndexPage;
