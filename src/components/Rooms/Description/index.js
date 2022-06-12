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
import loginLeftSide from '../../../assets/images/login-left-side.jpeg'

import './style.css'
import styled from '@emotion/styled';
import createRoom from '../../../db/createRoom';
import NumberFormat from 'react-number-format';

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

export default function Description({ setPage, roomForm, setCreatingPhase }) {

    const history = useHistory();

    const [people, setPeople] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [visit, setVisit] = useState(false);
    const [furniture, setFurniture] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [garage, setGarage] = useState(false);
    const [pets, setPets] = useState(false);
    const [party, setParty] = useState(false);
    const [smoker, setSmoker] = useState(false);
    const [price, setPrice] = useState(null);
    const [song, setSong] = useState(false);
    const [description, setDescription] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        uploadImages()
    }, [])

    const uploadImages = async () => {
        const storage = getStorage();
        let photoUrl = [];
        if (roomForm && roomForm.photos.length) {
            for (let i = 0; i < roomForm.photos.length; i++) {
                const storageRef = ref(storage, roomForm.photos[i].name + '_' + Math.random() * 10000);
                await uploadBytes(storageRef, roomForm.photos[i]).then(async (snapshot) => {
                    if (snapshot) {
                        await getDownloadURL(ref(storage, snapshot.metadata.name))
                            .then((url) => {
                                photoUrl.push(url);
                            })
                    }
                });
            }
        }
        roomForm.photos = photoUrl;
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
        const finalForm = { ...roomForm, details, ownerPhoto: user.photo, owner: user._id, price: data.get('price').replace(/[^a-zA-Z0-9]/g, "").substring(1) }
        const insertedForm = await createRoom(finalForm);
        if (insertedForm?.data?.message === "Ok!") {
            setSuccess(true);
            setTimeout(() => {
                document.location.reload(true);
            }, 3000)
        } else {
            setError(true);
        }

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
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
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
                                    setSong(e.target.checked)
                                } />}
                                label="Pode som alto?"

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
                        <Grid>
                            <Grid xs={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="price"
                                    label="Preço (R$)"
                                    name="price"
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
                                <Alert severity="success" onClose={() => { setSuccess(false) }}> Sucesso! — <strong>Quarto criado com sucesso!</strong></Alert>
                            </Stack>
                        }

                        <Grid xs={6}>
                            <Button sx={{
                                mr: 2,
                                mt: 4,
                                mb: 6
                            }}
                                type='submit'
                                disabled={success}
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