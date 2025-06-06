import React, { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'

//Material UI
import {
    Grid,
    CssBaseline,
    Typography,
    Button,
    Paper,
    Box
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg'
import backgroundImage from '../../assets/images/background-login.jpg'

import './style.css'

export default function PreviousLogin() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const theme = createTheme(
        {
          typography: {
            fontFamily: [
              '"SF Pro Display"',
              'sans-serif',
            ].join(','),
          },
        }
      );

    return (
        <>
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
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <Grid
                            item
                            xs={12}
                            sm={8}
                            md={5}
                            elevation={6}
                            square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    mt: 12,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    color: '#fff',
                                }}
                            >
                                <Typography sx={{fontSize: '130%'}}>
                                    Encontrar colegas de quarto nunca foi tão fácil! Você está apenas a alguns passos do quarto perfeito!
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={8}
                            md={5}
                            elevation={6}
                            square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    mt: '80%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: '3vh',
                                        mb: 4,
                                        minHeight: '7vh',
                                        fontSize: '100%',
                                        color: '#274293',
                                        fontWeight: 600,
                                        backgroundColor: '#fff'
                                    }}
                                    component={LinkRouter} to="/login"
                                >
                                    VAMOS LÁ!
                                </Button>
                                {/* <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        minHeight: '7vh',
                                        fontSize: '100%',
                                        color: '#fff',
                                        fontWeight: 600,
                                        background: 'none',
                                        border: '2px solid #FFFFFF'
                                    }}
                                    component={LinkRouter} to="/login"
                                >
                                    SOU DONO DE UM QUARTO
                                </Button> */}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}