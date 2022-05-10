import React, { useEffect } from 'react'

// Material ui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Images
import loginLeftSide from '../../../../assets/images/login-left-side.jpeg'

import './style.css'

const theme = createTheme();

export default function Smoker({ setQuestionPosition, questionPosition, setAnswers }) {

    useEffect(() => {

    },[])

    const nextQuestion = (choice) => {
        setQuestionPosition(questionPosition + 1);
        setAnswers(prevState => ({ ...prevState, smoker: choice }));
    }

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
                            <Box component="form"
                                noValidate
                                sx={{
                                    mt: 18,
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
                                        🤔
                                    </Grid>
                                </Box>
                            </Box>

                            <Grid container sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 4
                            }}>
                                <Typography sx={{
                                    fontWeight: 600
                                }}>
                                    Conviveria com fumantes?
                                </Typography>
                            </Grid>

                            <Box component="form" noValidate>
                                <Grid container sx={{ mt: 8 }}>
                                    <Grid xs={6} sx={{ paddingRight: 1 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                mt: 6,
                                                mb: 2,
                                                minHeight: '6vh',
                                                fontSize: 16,
                                                color: '#274293',
                                                fontWeight: 600,
                                                background: 'none',
                                                border: '1px solid #274293'
                                            }}
                                            onClick={() => nextQuestion('yes')}
                                        >
                                            😊 Sim
                                        </Button>
                                    </Grid>
                                    <Grid xs={6} sx={{ paddingLeft: 1 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                mt: 6,
                                                mb: 2,
                                                minHeight: '6vh',
                                                fontSize: 16,
                                                color: '#274293',
                                                fontWeight: 600,
                                                background: 'none',
                                                border: '1px solid #274293'
                                            }}
                                            onClick={() => nextQuestion('no')}
                                        >
                                            😷 Não
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mb: 2,
                                        minHeight: '6vh',
                                        fontSize: 16,
                                        color: '#274293',
                                        fontWeight: 600,
                                        background: 'none',
                                        border: '1px solid #274293'
                                    }}
                                    onClick={() => nextQuestion('both')}
                                >
                                    Cada um no seu canto
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}