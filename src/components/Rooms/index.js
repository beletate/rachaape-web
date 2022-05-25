import { Box, Button, createTheme, CssBaseline, Fab, Grid, IconButton, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg'
import noImage from '../../assets/images/no-image.png'

import mock from '../__Mocks__/Aps';

import './style.css'
import CreateRooms from './Create';
import getRoomsById from '../../db/getRoomsById';
import deleteRoom from '../../db/deleteRoom';

const theme = createTheme();

export default function Rooms({ setActualComponent, profile }) {

    const history = useHistory();

    const [page, setPage] = useState('getting');
    const [myRooms, setMyRooms] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        checkIfAlreadyContainAProfile();
    }, [])

    const checkIfAlreadyContainAProfile = () => {
        if (!profile && !profile?._id) {
            // eslint-disable-next-line no-unused-expressions
            history.push('/home'), [history];
        } else {
            getAllRooms();
        }

    }

    const getAllRooms = async () => {
        const rooms = await getRoomsById(profile);
        if (rooms && rooms.data.length) {
            setMyRooms(rooms.data)
        }
    }

    const returnLastPage = async () => {
        history.goBack();
    }

    const deleteRooms = async (id) => {
        const deleted = await deleteRoom(id);
        if (deleted && deleted?.data?.message === 'Quarto removido com sucesso.') {
            getAllRooms();
        }
    }

    return (
        <>
            {
                page === 'getting' &&
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
                        <Grid item xs={12} sm={8} md={5} elevation={6} square
                            sx={{
                                backgroundColor: '#FCFDFE'
                            }}>

                            <Box
                                sx={{
                                    my: 4,
                                    mx: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
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
                                                    onClick={() => setActualComponent(undefined)}>
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
                                <Typography component="h1" variant="h4" sx={{
                                    fontWeight: 800
                                }}>
                                    Meus quartos 🏠
                                </Typography>
                            </Box>
                            {
                                !!myRooms && !!myRooms.length && myRooms.map((room) => (
                                    <>
                                        <Grid item container sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            mt: 2,
                                            padding: 2,
                                            width: '94%',
                                            ml: 1.4,
                                            backgroundColor: '#fff',
                                            borderRadius: '5px',
                                            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.05)'
                                        }}>
                                            <Grid container sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                textAlign: 'center'
                                            }}>
                                                <Grid xs={4} item={true} container sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    maxHeight: '10vh'
                                                }}>
                                                    <img style={{ maxHeight: '100%', minWidth: '100%', borderRadius: '5%' }} src={room.photos[0] || noImage} alt="room"></img>
                                                </Grid>
                                                <Grid xs={8} item={true} container sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    paddingLeft: '1vh',
                                                }}>
                                                    <Grid xs={8} item={true} container sx={{
                                                        display: 'flex',
                                                        textAlign: 'left',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                    }}>
                                                        <Typography sx={{
                                                            fontWeight: '600'
                                                        }}>
                                                            {room.price} /mês
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={4} item={true} container sx={{
                                                        display: 'flex',
                                                        justifyContent: 'right',
                                                        textAlign: 'center',
                                                        verticalAlign: 'middle'
                                                    }}>
                                                        <IconButton color="inherit" aria-label="trash"
                                                            sx={{ color: 'red' }}
                                                            onClick={() => deleteRooms(room._id)}
                                                        >
                                                            <DeleteForeverIcon sx={{ height: 40 }} />
                                                        </IconButton>

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
                                                            {room.street}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                ))
                            }

                            <Fab size="medium" color="primary" aria-label="add"
                                sx={{
                                    position: 'absolute',
                                    bottom: 80,
                                    right: 16,
                                }}
                                onClick={() => {
                                    setPage('creating')
                                }}>
                                <AddIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                </ThemeProvider >
            }
            {
                page === 'creating' &&
                <CreateRooms setPage={setPage} />
            }
        </>
    )
}