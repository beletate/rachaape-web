import React, { useEffect, useState } from 'react'


import { Box, createTheme, CssBaseline, Fab, Grid, IconButton, ThemeProvider, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import NavBar from '../NavBar'

import Avatar from '../../assets/images/avatar2.png';

import './style.css'

import loginLeftSide from '../../assets/images/login-left-side.jpeg'
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import Rooms from '../Rooms';

const theme = createTheme();


export default function Profile() {

    const history = useHistory();

    const [profile, setProfile] = useState({});
    const [actualComponent, setActualComponent] = useState(null);

    useEffect(() => {
        checkIfAlreadyContainAProfile()
    }, [])

    const checkIfAlreadyContainAProfile = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user?._id) {
            setProfile(user);
        } else {
            // eslint-disable-next-line no-unused-expressions
            history.push('/home'), [history];
        }
    }

    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        top: 140,
        height: "15%",
        width: "35%",
        margin: '0 auto',
    });

    return (
        <>
            {!actualComponent &&
                <ThemeProvider theme={theme}>
                    <Grid container component="main" sx={{ height: '100vh' }}>
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
                                backgroundColor: '#F5F6F9'
                            }}
                        >
                            <Box
                                sx={{
                                    pt: 8,
                                    pb: 22,
                                    px: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    backgroundColor: '#274293',
                                    color: '#fff',
                                    borderRadius: '0px 0px 20px 80px'
                                }}
                            >
                                <Typography component="h2" variant="h5" sx={{
                                    fontWeight: 800
                                }}>
                                    Perfil
                                </Typography>
                            </Box>
                            <Box sx={{
                                mt: -5,
                                px: 2,
                            }}>
                                <Grid container
                                    sx={{
                                        alignItems: 'center',
                                        backgroundColor: "white",
                                        pt: 2,
                                        px: 1,
                                        top: 'auto',
                                        borderRadius: '25px 25px 0px 0px',
                                        border: 'none !important'
                                    }}>

                                    <IconButton color="inherit" aria-label="chat"
                                    >
                                        <SettingsIcon />
                                    </IconButton>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <StyledFab>
                                        <img className="logo-image-web" style={{ width: '100%', height: '100%', borderRadius: '50%', border: 'none !important' }} src={profile.photo || Avatar} alt="logo" />
                                    </StyledFab>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <IconButton color="inherit" aria-label="chat"
                                    >
                                        <LogoutIcon />
                                    </IconButton>
                                </Grid>
                                <Grid container sx={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: "white"

                                }}>
                                    <Grid item xs mt={4}>
                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: 600,
                                            color: "black",
                                        }}>

                                            {profile.name || ''}
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: 12,
                                            fontWeight: 500,
                                            color: "black",
                                        }}>
                                            {profile.email || ''}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <CssBaseline />
                                <Grid container sx={{
                                    px: 1,
                                    display: 'flex',
                                    textAlign: 'left',
                                    flexDirection: 'column',
                                    backgroundColor: "white",
                                    borderRadius: '0px 0px 25px 25px',
                                    pb: 4
                                }}>
                                    <Box
                                        sx={{
                                            overflow: 'auto'
                                        }}
                                        onClick={() => setActualComponent('rooms')}
                                    >
                                        <Grid item xs mt={4} sx={{
                                            float: 'left'
                                        }}>
                                            <Typography sx={{
                                                fontSize: 18,
                                                fontWeight: 600,
                                                color: "#7C7F84",
                                            }}>

                                                <IconButton color="inherit" aria-label="chat"
                                                >
                                                    <BedroomChildIcon />
                                                </IconButton>
                                                Meus quartos
                                            </Typography>

                                        </Grid>
                                        <Grid item xs mt={4} sx={{
                                            float: 'right',
                                            color: "#7C7F84"
                                        }}>
                                            <IconButton color="inherit" aria-label="chat" >
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Grid>
                                    </Box>
                                    <Box
                                        sx={{
                                            overflow: 'auto',
                                            borderBottom: '1px solid #7C7F84"'
                                        }}
                                    >
                                        <Grid item xs mt={2} sx={{
                                            float: 'left'
                                        }}>
                                            <Typography sx={{
                                                fontSize: 18,
                                                fontWeight: 600,
                                                color: "#7C7F84",
                                            }}>

                                                <IconButton color="inherit" aria-label="chat"
                                                >
                                                    <FavoriteIcon />
                                                </IconButton>
                                                Favoritos
                                            </Typography>

                                        </Grid>
                                        <Grid item xs mt={2} sx={{
                                            float: 'right',
                                            color: "#7C7F84"
                                        }}>
                                            <IconButton color="inherit" aria-label="chat" >
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Grid>
                                    </Box>
                                    <Box
                                        sx={{
                                            overflow: 'auto',
                                            borderBottom: '1px solid #7C7F84"'
                                        }}
                                    >
                                        <Grid item xs mt={2} sx={{
                                            float: 'left'
                                        }}>
                                            <Typography sx={{
                                                fontSize: 18,
                                                fontWeight: 600,
                                                color: "#7C7F84",
                                            }}>

                                                <IconButton color="inherit" aria-label="chat"
                                                >
                                                    <ManageAccountsIcon />
                                                </IconButton>
                                                Conta
                                            </Typography>

                                        </Grid>
                                        <Grid item xs mt={2} sx={{
                                            float: 'right',
                                            color: "#7C7F84"
                                        }}>
                                            <IconButton color="inherit" aria-label="chat" >
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Grid>
                                    </Box>
                                    <Box
                                        sx={{
                                            overflow: 'auto',
                                            borderBottom: '1px solid #7C7F84"'
                                        }}
                                    >
                                        <Grid item xs mt={2} sx={{
                                            float: 'left'
                                        }}>
                                            <Typography sx={{
                                                fontSize: 18,
                                                fontWeight: 600,
                                                color: "#7C7F84",
                                            }}>

                                                <IconButton color="inherit" aria-label="chat"
                                                >
                                                    <InfoOutlinedIcon />
                                                </IconButton>
                                                Info
                                            </Typography>

                                        </Grid>
                                        <Grid item xs mt={2} sx={{
                                            float: 'right',
                                            color: "#7C7F84"
                                        }}>
                                            <IconButton color="inherit" aria-label="chat" >
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider >
            }
            {
                actualComponent === 'rooms' && 
                <Rooms setActualComponent={setActualComponent} profile={profile}></Rooms>
            }
            <NavBar />
        </>
    )
}