import React, { useEffect, useState } from 'react'
import WindowsScroll from '../Functions/WindowsScroll'
import { Link as LinkRouter } from 'react-router-dom'

// Material ui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Mock
import mock from '../__Mocks__/Aps';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg';

import './style.css'

const theme = createTheme();

export default function Home() {

    useEffect(() => {
        WindowsScroll();
    }, [])

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
                                my: 2,
                                mx: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                textAlign: 'left'
                            }}
                        >

                            <Grid container sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                mt: 4,
                                padding: 2,

                                backgroundColor: 'yellow'
                            }}>
                                <Grid container sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}>
                                    <Grid xs={4} item={true} container sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        maxHeight: '11vh'
                                    }}>
                                        <img style={{maxHeight: '100%', minWidth: '100%', borderRadius: '5%'}} src={mock[0].img} alt="room"></img>
                                    </Grid>
                                    <Grid xs={8} item={true} container sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',

                                        backgroundColor: 'white'
                                    }}>
                                        <Grid xs={4} item={true} container sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',

                                            backgroundColor: 'yellowgreen'
                                        }}>
                                            <Typography>A</Typography>
                                        </Grid>
                                        <Grid xs={8} item={true} container sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',

                                            backgroundColor: 'pink'
                                        }}>
                                            <Typography>A</Typography>
                                        </Grid>
                                        <Grid xs={12} item={true} container sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',

                                            backgroundColor: 'red'
                                        }}>
                                            <Typography>A</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    textAlign: 'center',

                                    mt: 1,
                                    backgroundColor: 'green'
                                }}>
                                    <Typography>
                                        AP
                                    </Typography>
                                </Grid>

                            </Grid>

                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}