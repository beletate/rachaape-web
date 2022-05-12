import { Box, Button, createTheme, CssBaseline, Grid, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg'

import './style.css'

const theme = createTheme();

export default function Function() {

    const history = useHistory();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        checkIfAlreadyContainAProfile();
    }, [])

    const checkIfAlreadyContainAProfile = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user?._id) {
            // eslint-disable-next-line no-unused-expressions
            history.push('/home'), [history];
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
                <Grid item xs={12} sm={8} md={5} elevation={6} square>
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

                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    )
}