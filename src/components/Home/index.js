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

// Mock
import mock from '../__Mocks__/Aps';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg';

import './style.css'

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        WindowsScroll();
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
                                            <ClearSharpIcon sx={{
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

                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Text in a modal
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                    </Grid>

                                </Box>
                            </Modal>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}