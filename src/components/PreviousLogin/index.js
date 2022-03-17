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

    },[])

    const theme = createTheme();

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
                                <Typography component="h1" variant="h5">
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
                                    mt: 50,
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
                                        mt: 3,
                                        mb: 4,
                                        minHeight: '7vh',
                                        fontSize: 16,
                                        color: '#274293',
                                        fontWeight: 600,
                                        backgroundColor: '#fff'
                                    }}
                                    component={LinkRouter} to="/login"
                                >
                                    ESTOU PROCURANDO UM QUARTO
                                </Button>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mb: 2,
                                        minHeight: '7vh',
                                        fontSize: 16,
                                        color: '#fff',
                                        fontWeight: 600,
                                        background: 'none',
                                        border: '2px solid #FFFFFF'
                                    }}
                                    component={LinkRouter} to="/login"
                                >
                                    SOU DONO DE UM QUARTO
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}