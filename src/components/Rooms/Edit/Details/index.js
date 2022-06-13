import { Box, Button, createTheme, CssBaseline, FormControlLabel, FormGroup, Grid, Switch, TextField, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { useHistory } from 'react-router-dom';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SendIcon from '@mui/icons-material/Send';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

// Images
import loginLeftSide from '../../../../assets/images/login-left-side.jpeg'

import './style.css'
import styled from '@emotion/styled';
import createRoom from '../../../../db/createRoom';
import NumberFormat from 'react-number-format';
import editRoom from '../../../../db/editRoom';

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

export default function EditDetailsRoom({ setPage, roomForm, setEditingPhase, completeRoom }) {

    const history = useHistory();

    const [people, setPeople] = useState(completeRoom.details.people);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [visit, setVisit] = useState(completeRoom.details.visit);
    const [furniture, setFurniture] = useState(completeRoom.details.furniture);
    const [wifi, setWifi] = useState(completeRoom.details.wifi);
    const [garage, setGarage] = useState(completeRoom.details.garage);
    const [pets, setPets] = useState(completeRoom.details.pets);
    const [price, setPrice] = useState();
    const [party, setParty] = useState(completeRoom.details.party);
    const [smoker, setSmoker] = useState(completeRoom.details.smoker);
    const [song, setSong] = useState(completeRoom.details.song);
    const [description, setDescription] = useState(completeRoom.details.description || '');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const returnLastPage = async () => {
        setEditingPhase('first');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setPrice(data.get('price'))
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
        const finalForm = { ...roomForm, details, owner: user._id, price: data.get('price').replace(/[^a-zA-Z0-9]/g, "").substring(1) }
        const insertedForm = await editRoom(completeRoom._id, finalForm)
        if (insertedForm?.data === "Quarto atualizado!") {
            setSuccess(true);
            await setTimeout(() => {
                // eslint-disable-next-line no-unused-expressions
                history.push('/profile')
            }, 1000)
        } else {
            setError(true);
        }
    }

    const currency = (e) => {
        const onlyDigits = e.target.value
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        e.target.value = maskCurrency(digitsFloat)
    }

    const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor)
    }

    const currencyFormatter = (formatted_value) => {
        if (!Number(formatted_value)) return "R$ 0,00";
        const br = { style: "currency", currency: "BRL" };
        return new Intl.NumberFormat("pt-BR", br).format(formatted_value / 100);
    };
    const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumberFormat
                {...other}
                getInputRef={ref}
                format={currencyFormatter}
                onValueChange={(e) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: e.value,
                        },
                    });
                }}
                thousandSeparator
                isNumericString
            />
        );
    });

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
                                            onClick={() => setEditingPhase('first')}>
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
                                control={<Switch checked={people} onChange={(e) =>
                                    setPeople(e.target.checked)
                                } />}
                                label="Há outros moradores?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch checked={visit} onChange={(e) =>
                                    setVisit(e.target.checked)
                                } />}
                                label="Visitas são permitidas?"

                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch checked={song} onChange={(e) =>
                                    setSong(e.target.checked)
                                } />}
                                label="Pode som alto?"

                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch checked={furniture} onChange={(e) =>
                                    setFurniture(e.target.checked)
                                } />}
                                label="Quarto mobiliado?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch checked={wifi} onChange={(e) =>
                                    setWifi(e.target.checked)
                                } />}
                                label="Possui Wifi?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch checked={garage} onChange={(e) =>
                                    setGarage(e.target.checked)
                                } />}
                                label="Possui garagem?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch checked={pets} onChange={(e) =>
                                    setPets(e.target.checked)
                                } />}
                                label="Permitido pets?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch checked={party} onChange={(e) =>
                                    setParty(e.target.checked)
                                } />}
                                label="Festas são permitidas?"


                            />
                            <FormControlLabel sx={{ my: 1 }}
                                control={<Switch checked={smoker} onChange={(e) =>
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
                                defaultValue={description}
                            />
                        </Grid>
                        <Grid>
                            <Grid xs={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="price"
                                    label="Preço (R$)"
                                    name="price"
                                    defaultValue={price || currencyFormatter(completeRoom.price)}
                                    autoComplete="price"
                                    variant='outlined'
                                    onChange={(e) => setPrice(e.target.value)}
                                    onInput={(e) => currency(e)}
                                /* InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }} */
                                />
                            </Grid>
                        </Grid>

                        {
                            error &&
                            <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
                                <Alert severity="error" onClose={() => { setError(false) }}> Ocorreu um erro. — <strong>Tente novamente!</strong></Alert>
                            </Stack>
                        }
                        {
                            success &&
                            <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
                                <Alert severity="success" onClose={() => { setSuccess(false) }}> Sucesso! — <strong>Quarto atualizado com sucesso!</strong></Alert>
                            </Stack>
                        }
                        <Grid xs={6}>
                            <Button sx={{
                                mr: 2,
                                mt: 4
                            }}
                                type='submit'
                                disabled={success}
                                variant="outlined" endIcon={<CheckBoxRoundedIcon />}
                            >
                                Editar
                            </Button>
                        </Grid>

                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    )
}