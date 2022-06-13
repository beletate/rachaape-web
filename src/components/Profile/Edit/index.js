import { Box, Button, CircularProgress, createTheme, CssBaseline, Grid, TextField, ThemeProvider } from '@mui/material'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import InputMask from "react-input-mask";

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

// Images
import loginLeftSide from '../../../assets/images/login-left-side.jpeg'

import './style.css'
import getUserById from '../../../db/getUserById';
import uploadProfile from '../../../db/uploadProfile';

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

export default function EditProfile(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [handleFile, setHandleFile] = useState(undefined);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [imageToShow, setImageToShow] = useState(null)
    const [sending, setSending] = useState(false);
    const [actualPhoto, setActualPhoto] = useState(null)
    const [phone, setPhone] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        checkIfAlreadyContainAProfile();
    }, [])

    const checkIfAlreadyContainAProfile = async () => {
        setLoading(true);
        let tmpProfile = await getUserById(props.match.params.id)
        if (tmpProfile.data) {
            setAge(tmpProfile.data.age)
            setMinPrice(tmpProfile.data.minPrice)
            setMaxPrice(tmpProfile.data.maxPrice)
            setName(tmpProfile.data.name)
            setPhone(tmpProfile.data.phone)
            setActualPhoto(tmpProfile.data.photo)
            setId(tmpProfile.data._id)
            setLoading(false)
        }
    }

    const handleFileRead = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            setImageToShow(URL.createObjectURL(file));
            setHandleFile(file);
            setActualPhoto(null)
        }
    }

    const currencyFormatter = (formatted_value) => {
        if (!Number(formatted_value)) return "R$ 0,00";
        const br = { style: "currency", currency: "BRL" };
        return new Intl.NumberFormat("pt-BR", br).format(formatted_value / 100);
    };

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

    const handleSubmit = async (event) => {
        setSending(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let photoUrl = actualPhoto;
        if (handleFile) {
            const storage = getStorage();
            const storageRef = ref(storage, name + '_' + Math.random() * 10000);
            await uploadBytes(storageRef, handleFile).then(async (snapshot) => {
                if (snapshot) {
                    await getDownloadURL(ref(storage, snapshot.metadata.name))
                        .then((url) => {
                            photoUrl = url;
                        })
                }
            });
        }
        const profileForm = {
            photo: photoUrl,
            name: data.get('name'),
            age: Number(data.get('age')),
            minPrice: data.get('minPrice').replace(/[^a-zA-Z0-9]/g, "").substring(1),
            maxPrice: data.get('maxPrice').replace(/[^a-zA-Z0-9]/g, "").substring(1),
            phone: data.get('phone').replace(/[^a-zA-Z0-9]/g, "")
        };
        let uploadedProfile = await uploadProfile(id, profileForm);
        if (uploadedProfile.status === 200) {
            let newUser = await getUserById(id)
            localStorage.setItem("user", JSON.stringify(newUser.data));
            history.goBack();
        }
        setSending(false);

    };


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
                        {
                            !!loading ?
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item xs={3} sx={{ mt: 4, mb: 0.2 }}>
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box>
                                    </Grid>

                                </Grid>
                                :
                                <>
                                    <label>

                                        <Box component="form"
                                            noValidate
                                            onSubmit={handleSubmit}
                                            sx={{
                                                mt: 8,
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}>
                                            <input
                                                style={{ display: 'none' }}
                                                id="photo"
                                                name="photo"
                                                type="file"
                                                accept='image/*'
                                                onChange={(e) => handleFileRead(e)}
                                            />

                                            <AddCircleRoundedIcon sx={{
                                                fontSize: '2.4rem',
                                                color: '#274293',
                                                display: 'block',
                                                position: 'absolute',
                                                marginLeft: '3.8rem'
                                            }}>
                                            </AddCircleRoundedIcon>
                                            <Box sx={{
                                                border: 1,
                                                width: '10rem',
                                                height: '10rem',
                                                borderStyle: 'dashed',
                                                borderRadius: '50%',
                                                textAlign: 'center',
                                                lineHeight: '10rem',

                                            }}>
                                                {
                                                    imageToShow || actualPhoto ?
                                                        <>
                                                            <img loading="lazy" src={actualPhoto || imageToShow} style={{ borderRadius: '50%', width: '9rem', height: '9rem', verticalAlign: 'middle' }} alt="profile" />
                                                        </>
                                                        :
                                                        <>
                                                            <PersonPinIcon sx={{
                                                                fontSize: '3rem',
                                                                color: 'gray',
                                                                verticalAlign: 'middle'
                                                            }}></PersonPinIcon>
                                                        </>
                                                }

                                            </Box>
                                        </Box>
                                    </label>
                                    <Box component="form" noValidate onSubmit={handleSubmit}>

                                        <TextField
                                            required
                                            margin="normal"
                                            fullWidth
                                            id="name"
                                            label="Nome"
                                            name="name"
                                            value={name}
                                            autoComplete="name"
                                            variant='standard'
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            margin="normal"
                                            fullWidth
                                            id="age"
                                            label="Idade"
                                            name="age"
                                            value={age}
                                            InputProps={{
                                                inputProps: {
                                                    type: 'number',
                                                    maxLength: 3
                                                }
                                            }}
                                            autoComplete="age"
                                            type="number"
                                            variant='standard'
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value < 100) {
                                                    setAge(value);
                                                }
                                            }}
                                        />
                                        <Grid container>
                                            <Grid xs={6} sx={{ paddingRight: 1 }}>
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id="minPrice"
                                                    label="Preço mín."
                                                    name="minPrice"
                                                    defaultValue={currencyFormatter(minPrice)}
                                                    autoComplete="minPrice"
                                                    variant='standard'
                                                    onChange={(e) => setMinPrice(e.target.value)}
                                                    onInput={(e) => currency(e)}
                                                /* InputProps={{
                                                    inputComponent: NumberFormatCustom,
                                                }} */
                                                />
                                            </Grid>
                                            <Grid xs={6} sx={{ paddingLeft: 1 }}>
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id="maxPrice"
                                                    label="Preço máx."
                                                    name="maxPrice"
                                                    defaultValue={currencyFormatter(maxPrice)}
                                                    autoComplete="maxPrice"
                                                    variant='standard'
                                                    onChange={(e) => setMaxPrice(e.target.value)}
                                                    onInput={(e) => currency(e)}
                                                /* InputProps={{
                                                    inputComponent: NumberFormatCustom,
                                                }} */
                                                />
                                            </Grid>
                                        </Grid>

                                        <InputMask
                                            mask="+55 (99) 99999-9999"
                                            disabled={false}
                                            value={phone}
                                            maskChar=" "
                                            onChange={(e) => setPhone(e.target.value)}
                                        >
                                            {() => <TextField required
                                                margin="normal"
                                                fullWidth
                                                id="phone"
                                                name="phone"
                                                label="Telefone"
                                                autoComplete="phone"
                                                variant='standard' />}
                                        </InputMask>
                                        {
                                            !loading ?
                                                <>
                                                    {
                                                        sending ?
                                                            <Grid
                                                                container
                                                                spacing={0}
                                                                direction="column"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                            >
                                                                <Grid item xs={3} sx={{ mt: 4, mb: 0.2 }}>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <CircularProgress />
                                                                    </Box>
                                                                </Grid>

                                                            </Grid>
                                                            :
                                                            <Button
                                                                type="submit"
                                                                fullWidth
                                                                variant="contained"
                                                                sx={{
                                                                    mt: 4,
                                                                    mb: 2,
                                                                    minHeight: '6vh',
                                                                    fontWeight: 600,
                                                                    fontSize: 16,
                                                                    backgroundColor: '#274293'
                                                                }}
                                                            >
                                                                Salvar
                                                            </Button>
                                                    }
                                                </>
                                                :
                                                <>
                                                    <Grid
                                                        container
                                                        spacing={0}
                                                        direction="column"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <Grid item xs={3} sx={{ mt: 4, mb: 0.2 }}>
                                                            <Box sx={{ display: 'flex' }}>
                                                                <CircularProgress />
                                                            </Box>
                                                        </Grid>

                                                    </Grid>
                                                </>
                                        }
                                    </Box>

                                </>
                        }

                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    )
}