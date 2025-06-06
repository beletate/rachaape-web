import React, { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'

// Material ui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Images
import loginLeftSide from '../../../../assets/images/login-left-side.jpeg'

import './style.css'

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

export default function Congrats() {

    useEffect(() => {

    },[])

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
                            height: '100%'
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} elevation={6} square>
                        <Box
                            sx={{
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                textAlign: 'left'
                            }}
                        >
                            <Box component="form"
                                noValidate
                                sx={{
                                    mt: 8,
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                <Box sx={{
                                    border: 1,
                                    borderColor: '#D4D9E9',
                                    width: '10rem',
                                    height: '10rem',
                                    borderRadius: '50%',
                                    textAlign: 'center',
                                    lineHeight: '10rem',

                                }}>
                                    <Grid sx={{
                                        fontSize: '3.4rem',
                                        color: 'gray',
                                        verticalAlign: 'middle'
                                    }}>
                                        🎉
                                    </Grid>
                                </Box>
                            </Box>

                            <Grid container sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                mt: 4
                            }}>
                                <Typography sx={{
                                    fontWeight: 600,
                                    mb: 1
                                }}>
                                    Uhul! Parabéns!
                                </Typography>

                                <Typography sx={{
                                    fontWeight: 300,
                                    mt: 1,
                                    mb: 16
                                }}>

                                    Agora te conhecemos melhor. 
                                    Vamos encontrar um espaço perfeito pra você!
                                </Typography>
                            </Grid>

                            <Box component="form" noValidate>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mb: 2,
                                        minHeight: '6vh',
                                        fontWeight: 550,
                                        fontSize: 14,
                                        backgroundColor: '#274293'
                                    }}
                                    component={LinkRouter} to="/account/register/city"
                                >
                                    Selecionar a cidade
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}