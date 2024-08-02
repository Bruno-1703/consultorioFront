import {
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { citas } from "../components/citas/Citas";

const IndexPage: React.FC = () => {
 // Obtener la fecha actual
 const hoy = new Date().toISOString().split('T')[0];

 // Calcular el total de citas para hoy
 const citasHoy = citas.filter(cita => cita.fechaSolicitud === hoy).length;

 // Encontrar la próxima cita
 const proximaCita = citas.find(cita => new Date(`${cita.fechaSolicitud}T${cita.hora}`) > new Date());

 // Calcular el resumen de estados
 const resumenEstados = citas.reduce((acc, cita) => {
   acc[cita.estado] = (acc[cita.estado] || 0) + 1;
   return acc;
 }, {} as Record<string, number>);
  const [date, setDate] = React.useState(new Date());

  const onDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div style={{ display: "flex" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Bienvenidos al consultorio médico 👩‍⚕️👨‍⚕️
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper style={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Calendario de citas
              </Typography>
              <Calendar
                onChange={onDateChange}
                value={date}
              />
              <Typography variant="body1" style={{ marginTop: "16px" }}>
                Citas para el día: {date.toLocaleDateString()}
              </Typography>
              {/* Aquí puedes agregar un componente para listar las citas del día seleccionado */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Hora actual
              </Typography>
              <Typography variant="body1">
                {new Date().toLocaleString()}
              </Typography>
            </Paper>
            <Paper style={{ padding: "16px", marginTop: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Información del consultorio
              </Typography>
              <Typography variant="body1">
                Dirección: Calle AV Pancho Ramirez S/N, Ciudad Sauce De Luna
              </Typography>
              <Typography variant="body1">
                Teléfono: +123 456 7890
              </Typography>
              <Typography variant="body1">
                Horario: Lunes a Sabado, 8:00 a 12:00 AM -16:00 a 21:00 PM
              </Typography>
            </Paper>
          </Grid>
        </Grid>    
      </Container>
    </div>
  );
};

export default IndexPage;
