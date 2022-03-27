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

import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';

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
                                        <img style={{ maxHeight: '100%', minWidth: '100%', borderRadius: '5%' }} src={mock[0].img} alt="room"></img>
                                    </Grid>
                                    <Grid xs={8} item={true} container sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        paddingLeft: '1vh',
                                        backgroundColor: 'white'
                                    }}>
                                        <Grid xs={8} item={true} container sx={{
                                            display: 'flex',
                                            textAlign: 'left',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            backgroundColor: 'yellowgreen'
                                        }}>
                                            <Typography sx={{
                                                fontWeight: '600'
                                            }}>
                                                R${mock[0].value} /mês
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4} item={true} container sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                            backgroundColor: 'pink',
                                        }}>
                                            <img style={{ position: 'absolute', maxHeight: '10%', maxWidth: '10%', borderRadius: '50%' }} src={mock[0].owner}></img>

                                        </Grid>
                                        <Grid xs={12} item={true} container sx={{
                                            display: 'flex',
                                            textAlign: 'left',
                                            backgroundColor: 'red'
                                        }}>
                                            <Typography sx={{
                                                fontWeight: '600'
                                            }}>
                                                {mock[0].street}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{
                                    display: 'flex',
                                    textAlign: 'left',
                                    paddingLeft: 1,
                                    mt: 1,
                                    backgroundColor: 'green'
                                }}>
                                    <Typography>
                                        <HotelOutlinedIcon sx={{ color: '#274293' }}>
                                        </HotelOutlinedIcon>
                                    </Typography>

                                    <Typography>
                                        <ShowerOutlinedIcon sx={{ color: '#274293' }}></ShowerOutlinedIcon>
                                    </Typography>

                                    <Typography>
                                        <DirectionsCarFilledOutlinedIcon sx={{ color: '#274293' }}></DirectionsCarFilledOutlinedIcon>
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