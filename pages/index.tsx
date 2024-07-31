import {
  Container,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const IndexPage: React.FC = () => {

  const [date, setDate] = React.useState(new Date());

  const onDateChange = (newDate: Date) => {
    setDate(newDate);
    // Aquí podrías agregar lógica para mostrar las citas del día seleccionado
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
