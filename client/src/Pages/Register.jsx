import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Copyright from './utils/CopyRights';
import { registerValidation } from '../utils/validations/register';
import { useAppContext } from '../ContextAPI/AppContext';
import { useGlobalContext } from '../ContextAPI/GlobalContext';
import { parseErrorMessage } from '../utils/helpers';

const theme = createTheme();
const initialError = { firstName: "", lastName: "", email: "", password: "" }

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errorMessages, setErrorMessage] = useState({ ...initialError });
  const { userService, loading, setLoading } = useAppContext();
  const { showAlert } = useGlobalContext();
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
    }
    const isRegisterValid = registerValidation(formData);
    if (isRegisterValid.isInValid) {
      setErrorMessage({
        ...isRegisterValid.messages,
      });
    } else {
      try {
        setLoading(true);
        await userService.register(formData);
        showAlert({ message: "Registration success, Please login", severity: "success", timeOut: 8000 })
        navigate("/login");
      } catch (e) {
        console.log(e, "Registration failed");
        const message = parseErrorMessage(e, "Registration Failed")
        showAlert({ message, severity: "error", timeOut: 8000 });
      } finally {
        setLoading(false);
        setErrorMessage({
          ...initialError,
        });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  error={!!errorMessages.firstName}
                  helperText={errorMessages.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastname"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  error={!!errorMessages.lastName}
                  helperText={errorMessages.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={!!errorMessages.email}
                  helperText={errorMessages.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={!!errorMessages.password}
                  helperText={errorMessages.password}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              loading={loading}
            >
              Sign Up
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}