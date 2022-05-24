import { Box, Button, createTheme, CssBaseline, FormControlLabel, FormGroup, Grid, Switch, TextField, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SendIcon from '@mui/icons-material/Send';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Images
import loginLeftSide from '../../../assets/images/login-left-side.jpeg'

import './style.css'
import styled from '@emotion/styled';
import createRoom from '../../../db/createRoom';

const theme = createTheme();

export default function Description({ setPage, roomForm, setCreatingPhase }) {

    const history = useHistory();

    const [people, setPeople] = useState(false);
    const [visit, setVisit] = useState(false);
    const [furniture, setFurniture] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [garage, setGarage] = useState(false);
    const [pets, setPets] = useState(false);
    const [party, setParty] = useState(false);
    const [smoker, setSmoker] = useState(false);
    const [song, setSong] = useState(false);
    const [description, setDescription] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        checkIfAlreadyContainAProfile();
        console.log(roomForm)
    }, [])

    const checkIfAlreadyContainAProfile = () => {
        const user = JSON.parse(localStorage.getItem("user"));
    }


    const returnLastPage = async () => {
        setCreatingPhase('first');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const details = {
            description: data.get('description'),
            people: people,
            visit: visit,
            furniture: furniture,
            wifi: wifi,
            garage: garage,
            pets: pets,
            party: party,
            smoker: smoker,
            song: song,
        };
        const user = JSON.parse(localStorage.getItem("user"));
        const finalForm = { ...roomForm, details, owner: user._id }
        //const insertedForm = await createRoom(finalForm);
        

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
                                            onClick={() => setCreatingPhase('first')}>
                                        </ArrowBackIosNewRoundedIcon>
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
                        <Typography >
                            Aqui solicitaremos alguns detalhes do quarto.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            mb: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'left'
                        }}
                        component="form" noValidate onSubmit={handleSubmit}
                    >
                        <FormGroup>

                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch onChange={(e) =>
                                    setPeople(e.target.checked)
                                } />}
                                label="Há outros moradores?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch onChange={(e) =>
                                    setVisit(e.target.checked)
                                } />}
                                label="Visitas são permitidas?"

                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch onChange={(e) =>
                                    setFurniture(e.target.checked)
                                } />}
                                label="Quarto mobiliado?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch onChange={(e) =>
                                    setWifi(e.target.checked)
                                } />}
                                label="Possui Wifi?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch onChange={(e) =>
                                    setGarage(e.target.checked)
                                } />}
                                label="Possui garagem?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch onChange={(e) =>
                                    setPets(e.target.checked)
                                } />}
                                label="Permitido pets?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch onChange={(e) =>
                                    setParty(e.target.checked)
                                } />}
                                label="Festas são permitidas?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch onChange={(e) =>
                                    setSmoker(e.target.checked)
                                } />}
                                label="Permitido fumantes?"


                            />
                        </FormGroup>

                        <Grid xs={12}>
                            <TextField
                                margin="normal"
                                fullWidth
                                multiline
                                id="description"
                                label="Descreva o imóvel e sua redondeza"
                                name="description"
                                autoComplete="description"
                                variant='outlined'
                            />
                        </Grid>

                        <Grid xs={6}>
                            <Button sx={{
                                mr: 2,
                                mt: 4
                            }}
                                type='submit'
                                variant="outlined" endIcon={<CheckBoxRoundedIcon />}
                            >
                                Finalizar
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    )
}