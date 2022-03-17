import * as React from 'react';
import { Link as LinkRouter } from 'react-router-dom'

// Material ui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg'
import instagram from '../../assets/images/instagram-icon.png'
import twitter from '../../assets/images/twitter-icon.png'
import google from '../../assets/images/google-icon.png'
import facebook from '../../assets/images/facebook-icon.png'

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginLeftSide})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left'
            }}
          >
            <Typography component="h1" variant="h4" sx={{
              fontWeight: 800
            }}>
              Login 👋
            </Typography>
            <Typography >
              Entre em uma conta existente ou crie uma.
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 8 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                variant='standard'
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                variant='standard'
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  minHeight: '6vh',
                  fontWeight: 600,
                  fontSize: 16,
                  backgroundColor: '#274293'
                }}
                component={LinkRouter} to="/"
              >
                Entrar
              </Button>
              <Grid container sx={{ flexDirection: 'column', alignItems: 'center' }}>
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#274293",
                    textDecoration: 'none'
                  }}>
                    ESQUECEU A SENHA?
                  </Link>
                </Grid>

              </Grid>
            </Box>
          </Box>
          <Box sx={{ mt: 8, width: 1 }}>
            <Grid container sx={{ flexDirection: 'column', alignItems: 'center', backgroundColor: "#F5F6F9" }}>
              <Grid item xs mt={4}>
                <Typography sx={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#70747F",
                  textDecoration: 'none'
                }}>

                  OU ENTRE COM
                </Typography>
              </Grid>
              <Grid item xs mt={4}>
                <Box
                  sx={{
                    my: 2,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Grid mx={2} sx={{
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 25,
                    maxWidth: '50px',
                    maxHeight: '50px'
                  }}>
                    <img src={instagram} alt="instagram-logo"/>
                  </Grid>
                  <Grid mx={2} sx={{
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 25,
                    maxWidth: '50px',
                    maxHeight: '50px'
                  }}>
                    <img src={twitter} alt="twitter-logo"/>
                  </Grid>
                  <Grid mx={2} sx={{
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 25,
                    maxWidth: '50px',
                    maxHeight: '50px',
                  }}>
                    <img src={facebook} alt="facebook-logo"/>
                  </Grid>
                  <Grid mx={2} sx={{
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 25,
                    maxWidth: '50px',
                    maxHeight: '50px'
                  }}>
                    <img src={google} alt="google-logo"/>
                  </Grid>
                </Box>
              </Grid>
              <Grid item mt={2} mb={4}>
                <Link
                  href="#"
                  variant="body2"
                  component={LinkRouter} to="/account/register"
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#274293",
                    textDecoration: 'none'
                  }}>
                  {"REGISTRAR UMA CONTA"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}