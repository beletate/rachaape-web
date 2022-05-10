import React, { useEffect, useState } from 'react'
import WindowsScroll from '../Functions/WindowsScroll'
import { Link as LinkRouter } from 'react-router-dom'

// Material ui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import PetsIcon from '@mui/icons-material/Pets';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import TvIcon from '@mui/icons-material/Tv';

// Mock
import mock from '../__Mocks__/Aps';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg';

import './style.css'
import { Divider } from '@mui/material';
import NavBar from '../NavBar';

const theme = createTheme();

const header = createTheme({
    typography: {
        fontFamily: [
            'SF Pro Display',
            'sans-serif'
        ]
    }
});

const style = {
    position: 'absolute',
    overflow: 'scroll',
    height: '100%',
    display: 'block',
    backgroundColor: '#fff'
};

export default function Home() {

    const [profile, setProfile] = useState({})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        WindowsScroll();
        setProfile(JSON.parse(localStorage.getItem("user")));
    }, [])

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }} >
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
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
                        sx={{
                            backgroundColor: '#F5F6F9'
                        }}>
                        <Grid item container sx={{
                            backgroundColor: '#fff',
                            height: '7vh',
                            textAlign: 'center',
                            justifyContent: 'center',

                        }}>
                            <Typography sx={{
                                lineHeight: '7vh',
                                color: '#274293',
                                fontWeight: '600'
                            }}
                                theme={header}>
                                Rachapê
                            </Typography>
                        </Grid>
                        <Box
                            sx={{
                                my: 2,
                                mx: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                textAlign: 'left'
                            }}
                        >
                            <Grid onClick={handleOpen} item container sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                mt: 2,
                                padding: 2,
                                backgroundColor: '#fff',
                                borderRadius: '5px',
                                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.05)'
                            }}>
                                <Grid container sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}>
                                    <Grid xs={4} item={true} container sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        maxHeight: '10vh'
                                    }}>
                                        <img style={{ maxHeight: '100%', minWidth: '100%', borderRadius: '5%' }} src={mock[0].img} alt="room"></img>
                                    </Grid>
                                    <Grid xs={8} item={true} container sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        paddingLeft: '1vh'
                                    }}>
                                        <Grid xs={8} item={true} container sx={{
                                            display: 'flex',
                                            textAlign: 'left',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}>
                                            <Typography sx={{
                                                fontWeight: '600'
                                            }}>
                                                R${mock[0].value} /mês
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4} item={true} container sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            verticalAlign: 'middle'
                                        }}>
                                            <img style={{ position: 'absolute', maxHeight: '10%', maxWidth: '10%', borderRadius: '50%' }} src={mock[0].owner}></img>

                                        </Grid>
                                        <Grid xs={12} item={true} container sx={{
                                            display: 'flex',
                                            textAlign: 'left'
                                        }}>
                                            <Typography sx={{
                                                fontWeight: '600',
                                                pt: 1,
                                                fontSize: 14
                                            }}>
                                                {mock[0].street}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{
                                    display: 'flex',
                                    textAlign: 'left',
                                    alignItems: 'center',
                                    verticalAlign: 'middle',
                                    paddingLeft: 1,
                                    mt: 1,
                                }}>
                                    <Grid xs={4}>
                                        <Typography sx={{
                                            fontSize: 11,
                                            mt: 0.4
                                        }}>
                                            <HotelOutlinedIcon sx={{ width: 20, color: '#274293', verticalAlign: 'middle', mr: 0.2 }}>
                                            </HotelOutlinedIcon>
                                            <span>{mock[0].rooms} quarto(s) </span>
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography sx={{
                                            fontSize: 11,
                                            mt: 0.4
                                        }}>
                                            <ShowerOutlinedIcon sx={{ width: 20, color: '#274293', verticalAlign: 'middle', mr: 0.2 }}>
                                            </ShowerOutlinedIcon>
                                            <span>{mock[0].baths} banheiro(s)</span>
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography sx={{
                                            fontSize: 11,
                                            mt: 0.4
                                        }}>
                                            <DirectionsCarFilledOutlinedIcon sx={{ width: 20, color: '#274293', verticalAlign: 'middle', mr: 0.2 }}>
                                            </DirectionsCarFilledOutlinedIcon>
                                            <span>{mock[0].garage} vaga(s)</span>
                                        </Typography></Grid>
                                </Grid>

                            </Grid>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                sx={{
                                    overflow: 'scroll',
                                }}
                            >
                                <Box sx={style}>
                                    <Grid sx={{
                                        maxWidth: '100%',
                                    }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                            }}>
                                            <ClearSharpIcon
                                                onClick={handleClose}
                                                sx={{
                                                    fontSize: '2.4rem',
                                                    color: '#fff',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    backgroundColor: 'rgb(151, 151, 151, 0.5)',
                                                    borderRadius: '50px',
                                                    p: 0.6,
                                                    m: 2
                                                }}>
                                            </ClearSharpIcon>
                                        </Box>
                                        <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={mock[0].img} alt="room"></img>
                                    </Grid>
                                    <Grid sx={{
                                        p: 4
                                    }}>
                                        <Typography >
                                            {mock[0].city}, {mock[0].state}
                                        </Typography>
                                        <Typography variant="h6" component="h3"
                                            sx={{
                                                fontWeight: 600
                                            }}>
                                            {mock[0].street} #{mock[0].number}
                                        </Typography>

                                        <Grid container sx={{
                                            display: 'flex',
                                            textAlign: 'left',
                                            alignItems: 'center',
                                            verticalAlign: 'middle',
                                            mt: 1,
                                        }}>
                                            <Grid xs={4}>
                                                <Typography sx={{
                                                    fontSize: 11,
                                                    mt: 0.4
                                                }}>
                                                    <HotelOutlinedIcon sx={{ width: 20, color: '#274293', verticalAlign: 'middle', mr: 0.2 }}>
                                                    </HotelOutlinedIcon>
                                                    <span>{mock[0].rooms} quarto(s) </span>
                                                </Typography>
                                            </Grid>
                                            <Grid xs={4}>
                                                <Typography sx={{
                                                    fontSize: 11,
                                                    mt: 0.4
                                                }}>
                                                    <ShowerOutlinedIcon sx={{ width: 20, color: '#274293', verticalAlign: 'middle', mr: 0.2 }}>
                                                    </ShowerOutlinedIcon>
                                                    <span>{mock[0].baths} banheiro(s)</span>
                                                </Typography>
                                            </Grid>
                                            <Grid xs={4}>
                                                <Typography sx={{
                                                    fontSize: 11,
                                                    mt: 0.4
                                                }}>
                                                    <DirectionsCarFilledOutlinedIcon sx={{ width: 20, color: '#274293', verticalAlign: 'middle', mr: 0.2 }}>
                                                    </DirectionsCarFilledOutlinedIcon>
                                                    <span>{mock[0].garage} vaga(s)</span>
                                                </Typography></Grid>
                                        </Grid>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography sx={{ fontWeight: 600 }}>
                                            Descrição
                                        </Typography>

                                        <Typography sx={{ mt: 1, fontSize: 14, color: '#767984' }}>
                                            {mock[0].description}
                                        </Typography>

                                    </Grid>

                                    <Grid container sx={{
                                        display: 'flex',
                                        textAlign: 'left',
                                        backgroundColor: '#F5F6F9',
                                        height: '8rem',
                                        px: 4
                                    }}>
                                        <Grid xs={12}>
                                            <Typography sx={{
                                                fontSize: 14,
                                                pt: 2,
                                                fontWeight: 600
                                            }}>
                                                Facilidades
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12} sx={{
                                            display: 'flex'
                                        }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',

                                                }}>
                                                <NetworkWifiIcon
                                                    sx={{
                                                        fontSize: '3.4rem',
                                                        color: '#274293',
                                                        display: 'block',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '50px',
                                                        p: 1.8,
                                                        mr: 3,
                                                    }}>
                                                </NetworkWifiIcon>
                                                <Typography sx={{
                                                    fontSize: 12,
                                                    color: '#767984',
                                                    ml: 2,
                                                    pt: 1
                                                }}>
                                                    WiFi
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}>
                                                <PetsIcon
                                                    sx={{
                                                        fontSize: '3.4rem',
                                                        color: '#274293',
                                                        display: 'block',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '50px',
                                                        p: 1.8,
                                                        mx: 0.6,
                                                        mr: 3,
                                                    }}>
                                                </PetsIcon>
                                                <Typography sx={{
                                                    fontSize: 12,
                                                    color: '#767984',
                                                    ml: 2.4,
                                                    pt: 1
                                                }}>
                                                    Pets
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}>
                                                <SmokingRoomsIcon
                                                    sx={{
                                                        fontSize: '3.4rem',
                                                        color: '#274293',
                                                        display: 'block',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '50px',
                                                        p: 1.8,
                                                        mx: 0.6,
                                                        mr: 3,
                                                    }}>
                                                </SmokingRoomsIcon>
                                                <Typography sx={{
                                                    fontSize: 12,
                                                    color: '#767984',
                                                    ml: 1.4,
                                                    pt: 1,
                                                    lineBreak: 1
                                                }}>
                                                    Permitido
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}>
                                                <TvIcon
                                                    sx={{
                                                        fontSize: '3.4rem',
                                                        color: '#274293',
                                                        display: 'block',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '50px',
                                                        p: 1.8,
                                                        mx: 0.6,
                                                    }}>
                                                </TvIcon>
                                                <Typography sx={{
                                                    fontSize: 12,
                                                    color: '#767984',
                                                    ml: 3,
                                                    pt: 1,
                                                    lineBreak: 1
                                                }}>
                                                    Tv
                                                </Typography>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                    <Grid sx={{
                                        p: 4
                                    }}>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            Mais fotos
                                        </Typography>
                                        <Grid>
                                            <Box sx={{ my: 3 }}>
                                                <img src={mock[0].img} alt="room" style={{
                                                    width: '10rem',
                                                    borderRadius: '10px'
                                                }} />
                                            </Box>
                                        </Grid>

                                        <Typography sx={{ fontWeight: 600 }}>
                                            Colega de quarto
                                        </Typography>
                                        <Grid container sx={{
                                            display: 'flex',
                                            textAlign: 'left',
                                            height: '8rem',
                                        }}>
                                            <Grid xs={3} item={true} container sx={{
                                                display: 'flex',
                                                justifyContent: 'left',
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <img style={{ maxHeight: '64px', maxWidth: '64px', borderRadius: '50%', marginTop: '40%' }} src={mock[0].owner}></img>
                                            </Grid>
                                            <Grid xs={8} item={true} container sx={{
                                                display: 'table',
                                                height: '100%'
                                            }}>
                                                <Typography sx={{
                                                    position: 'relative',
                                                    top: '40%',
                                                    transform: 'translateY(-50%)',
                                                    fontWeight: 600
                                                }}>
                                                    {mock[0].name}, {mock[0].age}
                                                </Typography>
                                                <Typography sx={{
                                                    position: 'relative',
                                                    top: '40%',
                                                    transform: 'translateY(-50%)',
                                                    fontSize: 14,
                                                    color: '#767984'
                                                }}>
                                                    {mock[0].job}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Typography sx={{ fontSize: 14, color: '#767984' }}>
                                            Comigo não tem essa de pisar em ovos ou de ter receio de falar a verdade. Sou verdadeiro, sincero e transparente, doa a quem doer. Se eu não posso ser eu mesmo e dizer o que eu quiser dizer para você, é melhor mantermos distância. Não troco minha personalidade e minha honestidade por nada.
                                        </Typography>

                                        <Grid container sx={{
                                            display: 'flex',
                                            textAlign: 'left'
                                        }}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{
                                                    mt: 3,
                                                    mb: 2,
                                                    minHeight: '7vh',
                                                    fontWeight: 500,
                                                    fontSize: 16,
                                                    backgroundColor: '#274293'
                                                }}
                                            >
                                                Chat com {mock[0].name.split(' ')[0]}
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Modal>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
            <NavBar/>
        </>
    )
}