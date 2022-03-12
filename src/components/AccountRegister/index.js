import React, { useEffect, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'

import NumberFormat, { NumberFormatProps } from 'react-number-format';

// Formik
import { Formik } from 'formik';

// Material ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg'

import './style.css'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const theme = createTheme();

export default function AccountRegister() {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    useEffect(() => {

    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
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
                                        id="upload-photo"
                                        name="upload-photo"
                                        type="file"
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
                                        <PersonPinIcon sx={{
                                            fontSize: '3rem',
                                            color: 'gray',
                                            verticalAlign: 'middle'
                                        }}>
                                        </PersonPinIcon>
                                    </Box>
                                </Box>
                            </label>

                            <Box component="form" noValidate onSubmit={handleSubmit}>

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    variant='standard'
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="age"
                                    label="Idade"
                                    name="age"
                                    autoComplete="age"
                                    autoFocus
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
                                            autoFocus
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
                                            autoFocus
                                            variant='standard'
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    variant='standard'
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    autoComplete="phone"
                                    autoFocus
                                    variant='standard'
                                    InputProps={{
                                        inputComponent: NumberPhoneCustom,
                                    }}
                                />

                                <TextField
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
                                    component={LinkRouter} to="/"
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