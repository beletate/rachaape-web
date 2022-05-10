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
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg'
import instagram from '../../assets/images/instagram-icon.png'
import twitter from '../../assets/images/twitter-icon.png'
import google from '../../assets/images/google-icon.png'
import facebook from '../../assets/images/facebook-icon.png'

import userLogin from '../../db/userLogin';
import { useHistory, useLocation } from 'react-router-dom';

const theme = createTheme();

export default function Login() {

  const history = useHistory();

  const [loginForm, setLoginForm] = React.useState({});

  React.useEffect(() => {
    if (loginForm?.email && loginForm?.password) {
      executeLogin();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    checkIfAlreadyContainAProfile();
  }, [loginForm])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await setLoginForm({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const checkIfAlreadyContainAProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user?._id){
      // eslint-disable-next-line no-unused-expressions
      history.push('/home'), [history];
    }
  }
 
  const executeLogin = async () => {
    try {
      const login = await userLogin(loginForm);
      if (login && login?.data?.message) {
        localStorage.setItem("user", JSON.stringify(login.data.user));
        localStorage.setItem("auth", true);
        // eslint-disable-next-line no-unused-expressions
        history.push('/home'), [history];
      }
    } catch (e) {
      console.error(e)
    }
  }

  const returnLastPage = async () => {
    history.goBack();
  }

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
              my: 4,
              mx: 3,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left'
            }}
          >
            <Grid container sx={{ flexDirection: 'column' }}>
              <Grid item xs>
                <Box
                  sx={{
                    overflow: 'auto'
                  }}
                >
                  <Grid sx={{
                    float: 'left'
                  }}>
                    <ArrowBackIosNewRoundedIcon sx={{
                      color: '#4892F1'
                    }}
                      onClick={returnLastPage}>
                    </ArrowBackIosNewRoundedIcon>
                  </Grid>
                  <Grid sx={{
                    float: 'right',
                    backgroundColor: '#4892F1',
                    color: 'white',
                    fontWeight: 500,
                    borderRadius: '25px',
                    px: 1
                  }}>
                    1 de 4
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              mb: 4,
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
                    <img src={instagram} alt="instagram-logo" />
                  </Grid>
                  <Grid mx={2} sx={{
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 25,
                    maxWidth: '50px',
                    maxHeight: '50px'
                  }}>
                    <img src={twitter} alt="twitter-logo" />
                  </Grid>
                  <Grid mx={2} sx={{
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 25,
                    maxWidth: '50px',
                    maxHeight: '50px',
                  }}>
                    <img src={facebook} alt="facebook-logo" />
                  </Grid>
                  <Grid mx={2} sx={{
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 25,
                    maxWidth: '50px',
                    maxHeight: '50px'
                  }}>
                    <img src={google} alt="google-logo" />
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
    </ThemeProvider >
  );
}