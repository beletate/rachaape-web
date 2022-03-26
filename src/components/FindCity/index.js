import React, { useEffect, useState } from 'react';
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

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg';

// Mock
import estados from '../__Mocks__/Estados';

import getCities from '../../db/getCities';

import './style.css'

const theme = createTheme();

export default function FindCity() {

    const [cities, setCities] = useState([]);

    useEffect(() => {

    }, []);

    const handleStatesChange = (e) => {
        searchCitiesOfState(e.sigla);
    }

    const searchCitiesOfState = async (uf) => {
        const tmpCities = await getCities(uf);
        if (tmpCities && tmpCities.response && tmpCities.response.data.length) {
            setCities(tmpCities.response.data);
        }
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
                                my: 4,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                textAlign: 'left'
                            }}
                        >

                            <Grid container sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                mt: 4
                            }}>
                                <Typography sx={{
                                    mb: 1,
                                    mb: 12
                                }}>
                                    Escolha a cidade onde devemos encontrar um espaço perfeito para você!
                                </Typography>
                            </Grid>

                            <Box component="form" noValidate>
                                <Autocomplete
                                    disablePortal
                                    options={estados}
                                    onChange={(e, newValue) => handleStatesChange(newValue)}
                                    sx={{
                                        width: 300,
                                        mb: 6
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Estado" />}
                                />
                            </Box>

                            <Box component="form" noValidate>
                                <Autocomplete
                                    disablePortal
                                    options={cities || ''}
                                    getOptionLabel={(option) => (option.nome ? option.nome : '')}
                                    onChange={(e, newValue) => console.log(newValue)}
                                    sx={{
                                        width: 300,
                                        mb: 4
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Cidade" />}
                                />
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    mb: 2,
                                    minHeight: '7vh',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    backgroundColor: '#274293'
                                }}
                                component={LinkRouter} to="/home"
                            >
                                Me mostre os resultados
                            </Button>

                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}