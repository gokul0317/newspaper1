import React, { useCallback, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppContext } from '../ContextAPI/AppContext';
import { validateProfile } from "../utils/validations/profile";
import { UploadImage } from "../Components/Profile/UploadImage"

const theme = createTheme();

const initialError = { firstName: "", lastName: "", email: "", password: "" }

export default function Profile() {
  const { profile, updateProfile, loading } = useAppContext();
  const [userProfile, setUserProfile] = useState(profile);
  const [uploadView, setUploadView] = useState(false)
  const [errorMessages, setErrorMessage] = useState({ ...initialError });
  const handleUpdateProfile = useCallback((event) => {
    const { name, value } = event.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  }, [userProfile]);


  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const password = data.get("password");
    const formData = {
      email,
      firstName,
      lastName,
      password
    }
    const isProfileValid = validateProfile(formData);
    if (isProfileValid.isInValid) {
      setErrorMessage({
        ...isProfileValid.messages,
      });
    } else {
      await updateProfile(formData);
      setUserProfile({ ...formData, password: "" });
      setErrorMessage({ ...initialError });
    }
  }, [setErrorMessage, updateProfile]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar style={{ width: "64px", height: "64px" }} sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountBoxIcon style={{ height: "90%", width: "90%" }} />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ marginBottom: "10px" }}>
            Profile
          </Typography>
          <Button variant='outlined' onClick={() => setUploadView((vItem) => !vItem)}>
            {uploadView ? "Profile" : "Upload photo"}
          </Button>
          {!uploadView ? <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={userProfile?.firstName}
                  autoComplete="first name"
                  onChange={handleUpdateProfile}
                  error={!!errorMessages.firstName}
                  helperText={errorMessages.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="last name"
                  value={userProfile?.lastName}
                  onChange={handleUpdateProfile}
                  error={!!errorMessages.lastName}
                  helperText={errorMessages.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={userProfile?.email}
                  onChange={handleUpdateProfile}
                  error={!!errorMessages.email}
                  helperText={errorMessages.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  value={userProfile?.password}
                  onChange={handleUpdateProfile}
                  error={!!errorMessages.password}
                  helperText={errorMessages.password}
                />
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                  loading={loading}
                >
                  Update
                </LoadingButton>
              </Grid>
            </Grid>
          </Box> : <UploadImage />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}