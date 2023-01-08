import React, { useCallback, useState } from 'react';
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
import { loginValidation } from '../utils/validations/login';
import { useAppContext } from '../ContextAPI/AppContext';
import { useGlobalContext } from '../ContextAPI/GlobalContext';
import { parseErrorMessage } from '../utils/helpers';

const theme = createTheme();

const initailError = {
  email: "",
  password: ""
}

export default function Login() {
  const [loginError, setLoginError] = useState({
    ...initailError
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userService, setIsLoggedIn, setLoading, loading } = useAppContext();
  const { addToken, showAlert } = useGlobalContext();

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    const validateForm = loginValidation(formData)
    if (validateForm.isInValid) {
      setLoginError({ ...validateForm.messages });
    } else {
      try {
        setLoading(true);
        setLoginError({ ...initailError });
        const resp = await userService.login(formData);
        showAlert({ message: "Login Success", severity: "success", timeOut: 8000 });
        addToken(resp.data?.data.token);
        setIsLoggedIn(true);
        navigate("/");
      } catch(e) {
        console.log(e, "Login failed");
        const message = parseErrorMessage(e, "Failed to login");
        showAlert({ message , severity: "error", timeOut: 8000 });
      } finally {
        setLoading(false);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={!!loginError.email}
              helperText={loginError.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={!!loginError.password}
              helperText={loginError.password}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              loading={loading}
            >
              Log In
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}