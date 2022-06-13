import React, { useEffect, useState } from 'react'
import { ProfileContext } from '../../providers/profile';
import { useHistory } from 'react-router-dom'
import InputMask from "react-input-mask";

// Material ui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CircularProgress from '@mui/material/CircularProgress';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg'

import './style.css'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Checkbox, FormControlLabel, IconButton } from '@mui/material';

// Helpers
import checkEmail from '../../db/checkEmail';

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

export default function AccountRegister() {
    const history = useHistory();

    const { profile, setProfile } = React.useContext(ProfileContext);
    const [showPassword, setShowPassword] = useState(false);
    const [handleFile, setHandleFile] = useState(undefined);
    const [imageToShow, setImageToShow] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [messageErro, setMessageErro] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [term, setTerm] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    }, [])

    const handleFileRead = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            setImageToShow(URL.createObjectURL(file));
            setHandleFile(file);
        }
    }
    const handleSubmit = async (event) => {
        setMessageErro(false);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const profileForm = {
            photo: handleFile,
            name: data.get('name'),
            age: Number(data.get('age')),
            minPrice: data.get('minPrice').replace(/[^a-zA-Z0-9]/g, "").substring(1),
            maxPrice: data.get('maxPrice').replace(/[^a-zA-Z0-9]/g, "").substring(1),
            email: data.get('email'),
            password: data.get('password'),
            phone: data.get('phone').replace(/[^a-zA-Z0-9]/g, "")
        };
        setLoading(true);
        const emailEnable = await checkEmail(profileForm);
        if (emailEnable?.data?.message) {
            await setProfile(profileForm);
            setLoading(false);
            // eslint-disable-next-line no-unused-expressions
            history.push('/account/register/questions'), [history]
        } else {
            setMessageErro(true);
            setLoading(false);
        }
        setLoading(false);

    };

    const emailIsValid = (email) => {
        setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
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
    const acceptTerm = () => {
        return (
            <>
                Eu li e concordo com o <a href="https://drive.google.com/file/d/1ssdxJme8llgq5Parr23PD9JLORR5DFXv/view?usp=sharing" target="_blank" rel="noreferrer">termo de aceite</a>.
            </>
        )
    }

    const returnLastPage = async () => {
        history.goBack();
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
                                            2 de 4
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
                                Cadastro 🤗
                            </Typography>

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
                                            imageToShow ?
                                                <>
                                                    <img loading="lazy" src={imageToShow} style={{ borderRadius: '50%', width: '9rem', height: '9rem', verticalAlign: 'middle' }} alt="profile" />
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
                                            autoComplete="minPrice"
                                            variant='standard'
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            onInput={(e) => currency(e)}
                                        />
                                    </Grid>
                                    <Grid xs={6} sx={{ paddingLeft: 1 }}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="maxPrice"
                                            label="Preço máx."
                                            name="maxPrice"
                                            autoComplete="maxPrice"
                                            variant='standard'
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            onInput={(e) => currency(e)}

                                        />
                                    </Grid>
                                </Grid>

                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        emailIsValid(e.target.value)
                                    }}
                                    variant='standard'
                                />
                                {
                                    !!messageErro && <>
                                        <Typography sx={{ color: '#d40d1d' }}>Email indisponível para uso</Typography>
                                    </>
                                }

                                <InputMask
                                    mask="+55 (99) 99999-9999"
                                    disabled={false}
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

                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    id="password"
                                    variant='standard'
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="password"
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" onChange={(e) => {
                                        setTerm(e.target.checked);
                                    }} />}
                                    label={acceptTerm()}
                                />
                                {
                                    !loading ?
                                        <>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                disabled={!name || !age || phone.replace(/[^a-zA-Z0-9]/g, "").length < 12 || !emailValid || !password || !term}
                                                sx={{
                                                    mt: 4,
                                                    mb: 2,
                                                    minHeight: '6vh',
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    backgroundColor: '#274293'
                                                }}
                                            >
                                                Criar
                                            </Button>
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
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}