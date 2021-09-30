import React from "react";
import Card from "@mui/material/Card";
import { Container, Grid, Paper, TextareaAutosize } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const Profile = () => {
  const name = "Akash";
  const email = "ak55@iitbbs.ac.in";
  return (
    <Container>
      <Paper elevation={15} sx={{ minHeight: 750 }}>
        <Container>
          <TextField
            label="Name"
            defaultValue={`${name}`}
            InputProps={{
              readOnly: true,
            }}
            fullWidth={true}
            sx={{ marginBottom: 5, marginTop: 5 }}
          />
          <TextField
            label="Email"
            defaultValue={`${email}`}
            InputProps={{
              readOnly: true,
            }}
            fullWidth={true}
          />

          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <Typography variant="h5" sx={{ marginTop: 2, marginLeft: 2 }}>
                Your Tags
              </Typography>
              <Card sx={{ minHeight: 400, marginTop: 2 }}></Card>
            </Grid>

            <Grid item md={6} sm={12}>
              <Typography variant="h5" sx={{ marginTop: 2, marginLeft: 2 }}>
                Total Tags
              </Typography>
              <Card sx={{ minHeight: 400, marginTop: 2 }}></Card>
            </Grid>
            <Button variant="contained" color="success" sx={{ marginLeft: 3 }}>
              Submit New Tags
            </Button>
          </Grid>
        </Container>
      </Paper>
    </Container>
  );
};

export default Profile;
