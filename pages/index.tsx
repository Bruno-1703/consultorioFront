import {
  Container,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import React from "react";


const IndexPage: React.FC = () => {

return (
  <div style={{ display: "flex" }}>
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
         Bienvenidos al sistema 👋
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper style={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Main Content
              </Typography>
              <Typography variant="body1">
                This is the main content area where you can display charts,
                tables, and other components.
              </Typography>
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
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Full Width Content
              </Typography>
              <Typography variant="body1">
                This content stretches the full width of the container.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  </div>
);
};

export default IndexPage;
