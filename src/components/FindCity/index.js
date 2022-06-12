import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


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
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CircularProgress from '@mui/material/CircularProgress';

// Firebase

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg';

// Mock
import estados from '../__Mocks__/Estados';

import getCities from '../../db/getCities';

import './style.css'
import setUser from '../../db/setUser';

import { ProfileContext } from '../../providers/profile';
import { useHistory } from 'react-router-dom';

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

export default function FindCity() {

    const history = useHistory();

    const { profile, setProfile } = React.useContext(ProfileContext);

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageErro, setMessageErro] = useState(false);
    const [country, setCountry] = useState({
        state: "",
        city: ""
    })

    useEffect(() => {
        checkIfHasProfile()
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [country]);

    const checkIfHasProfile = () => {
        if (profile && profile.lifestyle && profile.email) {
            setProfile({ ...profile, country });
        } else {
            // eslint-disable-next-line no-unused-expressions
            history.push('/'), [history];
        }
    }

    const handleStatesChange = (e) => {
        searchCitiesOfState(e.sigla);
    }

    const searchCitiesOfState = async (uf) => {
        const tmpCities = await getCities(uf);
        if (tmpCities && tmpCities.response && tmpCities.response.data.length) {
            setCountry({ ...country, state: uf });
            setCities(tmpCities.response.data);
        }
    }

    const saveCurrentUser = async () => {
        setLoading(true);
        const storage = getStorage();
        const storageRef = ref(storage, profile.name + '_' + Math.random() * 10000);
        let photoUrl;
        await uploadBytes(storageRef, profile.photo).then(async (snapshot) => {
            if (snapshot) {
                await getDownloadURL(ref(storage, snapshot.metadata.name))
                    .then((url) => {
                        photoUrl = url;
                    })
            }
        });
        profile['photo'] = photoUrl;
        const tmpReturn = await setUser(profile);
        if (tmpReturn && tmpReturn.statusText === "Created" && tmpReturn.data.user) {
            delete tmpReturn.data.user.password;
            setLoading(false)
            setProfile(tmpReturn.data.user);
            localStorage.setItem("user", JSON.stringify(tmpReturn.data.user));
            localStorage.setItem("auth", true);
            // eslint-disable-next-line no-unused-expressions
            history.push('/home'), [history];
        } else {
            setLoading(false);
            setMessageErro(true);
            setTimeout(() => {
                setMessageErro(false)
            }, 4000)
        }
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
                                            4 de 4
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
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
                            }}>
                                <Typography sx={{
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
                                        mb: 6,
                                        ml: 1.6
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Estado" />}
                                />
                            </Box>

                            <Box component="form" noValidate>
                                <Autocomplete
                                    disablePortal
                                    options={cities || ''}
                                    getOptionLabel={(option) => (option.nome ? option.nome : '')}
                                    onChange={(e, newValue) => setCountry({ ...country, city: newValue?.nome })}
                                    sx={{
                                        width: 300,
                                        mb: 4,
                                        ml: 1.6
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Cidade" />}
                                />
                            </Box>

                            {
                                !loading ?
                                    <>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            disabled={!country?.city}
                                            sx={{
                                                mb: 2,
                                                minHeight: '7vh',
                                                fontWeight: 500,
                                                fontSize: 14,
                                                backgroundColor: '#274293'
                                            }}
                                            onClick={() => saveCurrentUser()}
                                        >
                                            Me mostre os resultados
                                        </Button>
                                        {
                                            !!messageErro && <>
                                                <Typography sx={{ color: '#d40d1d', ml: 3 }}>Ocorreu um erro em finalizar seu cadastro...</Typography>
                                            </>
                                        }
                                    </>
                                    :
                                    <>
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
                                    </>
                            }

                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}