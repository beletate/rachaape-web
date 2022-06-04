import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Box, Button, createTheme, CssBaseline, Grid, IconButton, Input, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material'

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SendIcon from '@mui/icons-material/Send';

// Images
import loginLeftSide from '../../../assets/images/login-left-side.jpeg'

import './style.css'

import mock from '../../__Mocks__/Aps';
import { PhotoCamera } from '@mui/icons-material';
import NumberFormat from 'react-number-format';
import getCep from '../../../db/getCep';
import Description from '../Description';

const theme = createTheme();
let fileObj = [];
let fileArray = [];
let imagesToUpload = [];

export default function CreateRooms({ setPage }) {

    const history = useHistory();

    const [creatingPhase, setCreatingPhase] = useState('first');
    const [file, setFile] = useState([]);
    const [searching, setSearching] = useState(false);
    const [type, setType] = useState();
    const [price, setPrice] = useState(null);
    const [cep, setCep] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [neighborhood, setNeighborhood] = useState(null);
    const [number, setNumber] = useState(null);
    const [additional, setAdditional] = useState(null);
    const [street, setStreet] = useState(null);
    const [roomForm, setRoomForm] = useState({});

    const uploadMultipleFiles = (e) => {
        e.preventDefault();
        fileObj.push(e.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            imagesToUpload.push(fileObj[0][i])
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        fileObj = [];
        setFile({ fileArray })
    }

    const uploadFiles = (e) => {
        e.preventDefault()
    }

    const deleteImage = (url) => {
        for (let i = 0; i < fileArray.length; i++) {
            if (fileArray[i] === url) {
                fileArray.splice(i, 1);
                setFile({ fileArray })
                imagesToUpload.splice(i, 1);
            }
        }
    }

    const findCEP = async (e) => {
        e.preventDefault();
        if (e.target.value.length === 8) {
            const cepData = await getCep(e.target.value);
            if (cepData.data) {
                setCep(e.target.value);
                setNeighborhood(cepData.data.bairro);
                setState(cepData.data.uf);
                setStreet(cepData.data.logradouro);
                setCity(cepData.data.localidade);
            }
        }
    }

    const currencyFormatter = (formatted_value) => {
        if (!Number(formatted_value)) return "R$ 0,00";
        const br = { style: "currency", currency: "BRL" };
        return new Intl.NumberFormat("pt-BR", br).format(formatted_value / 100);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const roomForm = {
            photos: imagesToUpload,
            type: data.get('type'),
            price: data.get('price'),
            cep: Number(data.get('cep')),
            city: city,
            state: state,
            neighborhood: neighborhood,
            number: Number(data.get('number')),
            additional: data.get('additional'),
            street: street
        };
        await setRoomForm(roomForm);
        setCreatingPhase('second');

        //saveCurrentUser(profileForm);
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

    return (<>
        {
            creatingPhase === 'first' &&
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
                                                onClick={() => setPage('getting')}>
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
                            component="form" noValidate onSubmit={handleSubmit}
                        >
                            <Grid>
                                <Grid xs={12}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="type"
                                        select
                                        label="Tipo"
                                        name="type"
                                        defaultValue="apartament"
                                        autoComplete="type"
                                        variant='outlined'
                                        onChange={(e) => setType(e.target.value)}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    >
                                        <MenuItem key={1} value={'apartament'}>
                                            Apartamento
                                        </MenuItem>
                                        <MenuItem key={2} value={'house'}>
                                            Casa
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>

                            <Box>
                                <Box >
                                    <Box sx={{

                                    }} className="card">
                                        <Box className="card-body" sx={{
                                            display: 'flex',
                                        }}>
                                            <form>
                                                <Box className="multi-preview" sx={{ border: '1px solid #274293', mb: 2, borderStyle: 'dashed' }}>
                                                    {(fileArray || []).map(url => (
                                                        <>
                                                            <img src={url} alt="..." key={url} />
                                                            <CancelRoundedIcon sx={{
                                                                fontSize: '2.0rem',
                                                                color: '#B20000',
                                                                marginBottom: '4.2rem',
                                                                marginLeft: '-1.4rem'
                                                            }}
                                                                onClick={() => deleteImage(url)}>
                                                            </CancelRoundedIcon>
                                                        </>
                                                    ))}
                                                </Box>
                                                <Button
                                                    variant="outlined"
                                                    component="label"
                                                    sx={{
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    Fotos
                                                    <PhotoCamera
                                                        sx={{
                                                            ml: 1,

                                                        }} />
                                                    <input type="file" hidden accept='image/*' onChange={uploadMultipleFiles} multiple />
                                                </Button>

                                            </form >
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Grid xs={6}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="cep"
                                    label="CEP"
                                    type="number"
                                    name="cep"
                                    autoComplete="cep"
                                    variant='outlined'
                                    keyboardType='numeric'
                                    inputProps={{ maxLength: 8, min: 0 }}
                                    onChange={(e) => findCEP(e)}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="street"
                                    label="Endereço"
                                    name="street"
                                    autoComplete="street"
                                    variant='outlined'
                                    disabled={true}
                                    value={street || ''}
                                />
                            </Grid>
                            <Grid container>
                                <Grid xs={4} sx={{ paddingRight: 1 }}>
                                    <TextField
                                        required
                                        margin="normal"
                                        fullWidth
                                        id="city"
                                        label="Cidade"
                                        name="city"
                                        autoComplete="city"
                                        variant='outlined'
                                        disabled={true}
                                        value={city || ''}
                                    />
                                </Grid>
                                <Grid xs={8} sx={{ paddingLeft: 1 }}>
                                    <TextField
                                        required
                                        margin="normal"
                                        fullWidth
                                        id="state"
                                        label="Estado"
                                        name="state"
                                        autoComplete="state"
                                        variant='outlined'
                                        disabled={true}
                                        value={state || ''}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid xs={8} sx={{ paddingRight: 1 }}>
                                    <TextField
                                        required
                                        margin="normal"
                                        fullWidth
                                        id="neighborhood"
                                        label="Bairro"
                                        name="neighborhood"
                                        autoComplete="neighborhood"
                                        variant='outlined'
                                        disabled={true}
                                        value={neighborhood || ''}
                                    />

                                </Grid>
                                <Grid xs={4} sx={{ paddingLeft: 1 }}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="number"
                                        label="Nº"
                                        name="number"
                                        type="number"
                                        autoComplete="number"
                                        variant='outlined'
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid xs={8}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="additional"
                                    label="Complemento"
                                    name="additional"
                                    autoComplete="additional"
                                    variant='outlined'
                                />
                            </Grid>
                            {/* <Grid>
                                <Grid xs={6}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="price"
                                        label="Preço (R$)"
                                        name="price"
                                        autoComplete="price"
                                        variant='outlined'
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </Grid>
                            </Grid> */}
                            <Grid xs={12}>
                                <Button sx={{
                                    textAlign: 'right',
                                    float: 'right',
                                    mr: 2,
                                    backgroundColor: '#274293',
                                    my: 4
                                }}
                                    disabled={!cep && !file.length && !street && !city && !state && !neighborhood && !number}
                                    type='submit'
                                    variant="contained" endIcon={<SendIcon />}
                                >
                                    Próximo
                                </Button>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
            </ThemeProvider >

        }
        {
            creatingPhase === 'second' &&
            <Description setPage={setPage} setCreatingPhase={setCreatingPhase} roomForm={roomForm} />
        }
    </>
    )
}
