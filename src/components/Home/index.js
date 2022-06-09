import React, { useEffect, useState } from 'react'
import WindowsScroll from '../Functions/WindowsScroll'

// Material ui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import ChairIcon from '@mui/icons-material/Chair';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import CelebrationIcon from '@mui/icons-material/Celebration';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import PetsIcon from '@mui/icons-material/Pets';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import TvIcon from '@mui/icons-material/Tv';
import BoyIcon from '@mui/icons-material/Boy';

// Mock
import mock from '../__Mocks__/Aps';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg';
import noImage from '../../assets/images/no-image.png'
import bar from '../../assets/images/line.png'

import './style.css'
import { Divider } from '@mui/material';
import NavBar from '../NavBar';
import { useHistory } from 'react-router-dom';
import getAllRooms from '../../db/getAllRooms';
import getUserByRoom from '../../db/getUserByRoom';

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

    const history = useHistory();

    const [notFound, setNotFound] = useState(true);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({})
    const [open, setOpen] = useState(false);
    const [rooms, setRooms] = useState([])
    const [actualRoom, setActualRoom] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        WindowsScroll();
        checkIfHasProfile();
    }, [])

    const checkIfHasProfile = async () => {
        const tmpProfile = JSON.parse(localStorage.getItem("user"));
        if (tmpProfile) {
            await setProfile(tmpProfile);
            getRooms(tmpProfile)
        } else {
            // eslint-disable-next-line no-unused-expressions
            history.push('/'), [history];
        }

    }

    const getRooms = async (tmpProfile) => {
        setLoading(true);
        const tmpRooms = await getAllRooms(tmpProfile);
        if (tmpRooms?.data?.length) {
            setRooms(tmpRooms.data);
            setLoading(false);
        } else {
            setNotFound(true);
            setLoading(false);
        }
    }

    const selectRoom = async (room) => {
        try {
            const roomUser = await getUserByRoom(room.owner);
            if (roomUser.data && roomUser.data._id) {
                console.log(room)
                room.user = roomUser.data;
                setActualRoom(room);
                setOpen(true);
                console.log(room)
            }
        } catch (e) {

        }
    }

    const openWhatsappChat = (data) => {
        let userNumber = data.user.phone.replaceAll(/[^a-zA-Z0-9]/g, "");
        let message = `Olá, tenho interesse em rachar o imóvel localizado na ${data.street}!`;
        window.open(`https://wa.me/${userNumber}?text=${message}`);
    }

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
                            {
                                !!loading ?
                                    <Grid
                                        container
                                        spacing={0}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        style={{ minHeight: '80vh' }}
                                    >

                                        <Grid item xs={3}>
                                            <Box sx={{ display: 'flex' }}>
                                                <CircularProgress />
                                            </Box>
                                        </Grid>

                                    </Grid>

                                    :
                                    <>
                                        {
                                            !notFound ?
                                                <>
                                                    {
                                                        !!rooms.length &&
                                                        rooms.map((room, index) => (
                                                            <>
                                                                <Grid onClick={() => selectRoom(room)} key={index} item container sx={{
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
                                                                            <img style={{ maxHeight: '100%', minWidth: '100%', borderRadius: '5%' }} src={room.photos[0] || noImage} alt="room"></img>
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
                                                                                    {room.price} /mês
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid xs={4} item={true} container sx={{
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                textAlign: 'center',
                                                                                verticalAlign: 'middle'
                                                                            }}>
                                                                                <img style={{ position: 'absolute', maxHeight: '10%', maxWidth: '10%', borderRadius: '50%' }} src={noImage}></img>

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
                                                                    <Grid container sx={{
                                                                        display: 'flex',
                                                                        textAlign: 'left',
                                                                        alignItems: 'center',
                                                                        verticalAlign: 'middle',
                                                                        paddingLeft: 1,
                                                                        mt: 1,
                                                                    }}>
                                                                        {
                                                                            room.details.people &&
                                                                            <>
                                                                                <Grid xs={4}>
                                                                                    <Typography sx={{
                                                                                        fontSize: 11,
                                                                                        mt: 0.4
                                                                                    }}>
                                                                                        <BoyIcon sx={{ width: 20, color: '#274293', verticalAlign: 'middle', mr: 0.2 }}>
                                                                                        </BoyIcon>
                                                                                        <span>1+ morador(s) </span>
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </>
                                                                        }
                                                                        {
                                                                            room.details.garage &&
                                                                            <>
                                                                                <Grid xs={4}>
                                                                                    <Typography sx={{
                                                                                        fontSize: 11,
                                                                                        mt: 0.4
                                                                                    }}>
                                                                                        <DirectionsCarFilledOutlinedIcon sx={{ width: 20, color: '#274293', verticalAlign: 'middle', mr: 0.2 }}>
                                                                                        </DirectionsCarFilledOutlinedIcon>
                                                                                        <span>1+ vaga(s)</span>
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </>
                                                                        }
                                                                    </Grid>

                                                                </Grid>
                                                            </>
                                                        ))
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
                                                        style={{ minHeight: '80vh' }}
                                                    >

                                                        <Grid item xs={3}>
                                                            <Box sx={{ display: 'flex' }}>
                                                            <Typography sx={{textAlign: 'center'}}>Ops, parece que ainda não temos quartos cadastrados nessa região. 😕</Typography>
                                                            </Box>
                                                        </Grid>

                                                    </Grid>
                                                    
                                                </>
                                        }

                                    </>

                            }

                            {
                                !!actualRoom &&

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
                                            <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={actualRoom.photos[0]} alt="room"></img>
                                        </Grid>
                                        <Grid sx={{
                                            p: 4
                                        }}>
                                            <Typography >
                                                {actualRoom.city}, {actualRoom.state}
                                            </Typography>
                                            <Typography variant="h6" component="h3"
                                                sx={{
                                                    fontWeight: 600
                                                }}>
                                                {actualRoom.street} #{actualRoom.number}
                                            </Typography>
                                            <Divider sx={{ my: 2 }} />
                                            <Typography sx={{ fontWeight: 600 }}>
                                                Descrição
                                            </Typography>

                                            <Typography sx={{ mt: 1, fontSize: 14, color: '#767984' }}>
                                                {actualRoom.details.description}
                                            </Typography>

                                        </Grid>

                                        <Grid container sx={{
                                            display: 'flex',
                                            textAlign: 'left',
                                            backgroundColor: '#F5F6F9',
                                            height: '12rem',
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

                                                {
                                                    actualRoom.details.wifi ?
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
                                                        </Box>
                                                        :
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                opacity: '10%'
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
                                                        </Box>
                                                }
                                                {
                                                    actualRoom.details.pets ?
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                opacity: '10%'
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
                                                        </Box>
                                                        :
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
                                                        </Box>
                                                }
                                                {
                                                    actualRoom.details.smoker ?
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
                                                        </Box>
                                                        :
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                opacity: '10%'
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
                                                        </Box>
                                                }

                                                {
                                                    actualRoom.details.furniture ?

                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',

                                                            }}>
                                                            <ChairIcon
                                                                sx={{
                                                                    fontSize: '3.4rem',
                                                                    color: '#274293',
                                                                    display: 'block',
                                                                    backgroundColor: '#fff',
                                                                    borderRadius: '50px',
                                                                    p: 1.8,
                                                                    mr: 3,
                                                                }}>
                                                            </ChairIcon>
                                                        </Box>
                                                        :
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                opacity: '10%'
                                                            }}>
                                                            < ChairIcon
                                                                sx={{
                                                                    fontSize: '3.4rem',
                                                                    color: '#274293',
                                                                    display: 'block',
                                                                    backgroundColor: '#fff',
                                                                    borderRadius: '50px',
                                                                    p: 1.8,
                                                                    mr: 3,
                                                                }}>
                                                            </ ChairIcon>
                                                        </Box>

                                                }
                                            </Grid>
                                            <Grid xs={12} sx={{
                                                display: 'flex'
                                            }}>
                                                {
                                                    actualRoom.details.party ?

                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                            }}>
                                                            <CelebrationIcon
                                                                sx={{
                                                                    fontSize: '3.4rem',
                                                                    color: '#274293',
                                                                    display: 'block',
                                                                    backgroundColor: '#fff',
                                                                    borderRadius: '50px',
                                                                    p: 1.8,
                                                                    mr: 3.6,
                                                                }}>
                                                            </ CelebrationIcon>
                                                        </Box>
                                                        :
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                opacity: '10%'
                                                            }}>
                                                            <CelebrationIcon
                                                                sx={{
                                                                    fontSize: '3.4rem',
                                                                    color: '#274293',
                                                                    display: 'block',
                                                                    backgroundColor: '#fff',
                                                                    borderRadius: '50px',
                                                                    p: 1.8,
                                                                    mr: 3,
                                                                }}>
                                                            </ CelebrationIcon>
                                                        </Box>

                                                }
                                                {
                                                    actualRoom.details.garage ?

                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                            }}>
                                                            <DirectionsCarIcon
                                                                sx={{
                                                                    fontSize: '3.4rem',
                                                                    color: '#274293',
                                                                    display: 'block',
                                                                    backgroundColor: '#fff',
                                                                    borderRadius: '50px',
                                                                    p: 1.8,
                                                                    mr: 3,
                                                                }}>
                                                            </ DirectionsCarIcon>
                                                        </Box>
                                                        :
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                opacity: '10%'
                                                            }}>
                                                            <DirectionsCarIcon
                                                                sx={{
                                                                    fontSize: '3.4rem',
                                                                    color: '#274293',
                                                                    display: 'block',
                                                                    backgroundColor: '#fff',
                                                                    borderRadius: '50px',
                                                                    p: 1.8,
                                                                    mr: 3,
                                                                }}>
                                                            </ DirectionsCarIcon>
                                                        </Box>

                                                }
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
                                                    {actualRoom.photos.map(photo => (

                                                        <img src={photo} alt="room" style={{
                                                            width: '10rem',
                                                            borderRadius: '10px'
                                                        }} />
                                                    ))}

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
                                                    <img style={{ maxHeight: '64px', maxWidth: '64px', borderRadius: '50%', marginTop: '40%' }} src={actualRoom.user.photo}></img>
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
                                                        {actualRoom.user.name}, {actualRoom.user.age}
                                                    </Typography>
                                                    <Typography sx={{
                                                        position: 'relative',
                                                        top: '40%',
                                                        transform: 'translateY(-50%)',
                                                        fontSize: 14,
                                                        color: '#767984'
                                                    }}>
                                                        Estudante
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            {/* <Typography sx={{ fontSize: 14, color: '#767984' }}>
                                                Comigo não tem essa de pisar em ovos ou de ter receio de falar a verdade. Sou verdadeiro, sincero e transparente, doa a quem doer. Se eu não posso ser eu mesmo e dizer o que eu quiser dizer para você, é melhor mantermos distância. Não troco minha personalidade e minha honestidade por nada.
                                            </Typography> */}

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
                                                    onClick={() => openWhatsappChat(actualRoom)}
                                                >
                                                    Chat com {actualRoom.user.name.split(' ')[0]}
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                </Modal>
                            }

                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
            <NavBar />
        </>
    )
}