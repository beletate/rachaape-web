import React, { useEffect, useState } from 'react'
import { ProfileContext } from '../../providers/profile';
import { useHistory } from 'react-router-dom'

import NumberFormat from 'react-number-format';

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

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg'

import './style.css'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

// Helpers
import setUser from '../../db/setUser';
import checkEmail from '../../db/checkEmail';

const theme = createTheme();

export default function AccountRegister() {
    const history = useHistory();

    const { profile, setProfile } = React.useContext(ProfileContext);
    const [showPassword, setShowPassword] = useState(false);
    const [handleFile, setHandleFile] = useState(undefined);
    const [imageToShow, setImageToShow] = useState(undefined);
    const [form, setForm] = useState({
        photo: "",
        name: "",
        age: "",
        minPrice: "",
        maxPrice: "",
        phone: "",
        email: "",
        password: ""
    });
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
            //const base64 = await convertBase64(file)
            setImageToShow(URL.createObjectURL(file));
            setHandleFile(file);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const profileForm = {
            photo: handleFile,
            name: data.get('name'),
            age: Number(data.get('age')),
            minPrice: data.get('minPrice'),
            maxPrice: data.get('maxPrice'),
            email: data.get('email'),
            password: data.get('password'),
            phone: data.get('phone')
        };
        const emailEnable = await checkEmail(profileForm);
        if (emailEnable?.data?.message) {
            await setProfile(profileForm);
            // eslint-disable-next-line no-unused-expressions
            history.push('/account/register/questions'), [history]
        }

        //saveCurrentUser(profileForm);
    };

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

    const NumberPhoneCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumberFormat {...other}
                format="+55 (##) #####-####"
                allowEmptyFormatting
                mask="_" />
        );
    });

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
                                                    <img src={imageToShow} style={{ borderRadius: '50%', width: '9rem', height: '9rem', verticalAlign: 'middle' }} alt="profile" />
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
                                />
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="age"
                                    label="Idade"
                                    name="age"
                                    autoComplete="age"
                                    type="number"
                                    variant='standard'
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
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
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
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
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
                                    variant='standard'
                                />
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    autoComplete="phone"
                                    variant='standard'
                                    InputProps={{
                                        inputComponent: NumberPhoneCustom,
                                    }}
                                />

                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    name="firstPassword"
                                    label="Senha"
                                    id="firstPassword"
                                    variant='standard'
                                    autoComplete="firstPassword"
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
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Repita a senha"
                                    id="password"
                                    variant='standard'
                                    autoComplete="password"
                                    type="password"
                                />
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
                                //component={LinkRouter} to="/account/register/questions"
                                >
                                    Criar
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}