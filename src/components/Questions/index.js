import React, { useEffect, useState } from 'react'
import { Link as LinkRouter, useHistory } from 'react-router-dom'

// Material ui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

// Images
import loginLeftSide from '../../assets/images/login-left-side.jpeg'
import comment from '../../assets/images/comment-icon.png'

import './style.css'
import Song from './Pages/Song';
import Animal from './Pages/Animal';
import Party from './Pages/Party';
import Smoker from './Pages/Smoker';
import Congrats from './Pages/Congrats';

import { ProfileContext } from '../../providers/profile';

const theme = createTheme();

export default function Questions() {

    const history = useHistory();

    const { profile, setProfile } = React.useContext(ProfileContext);

    const [questionPosition, setQuestionPosition] = useState(0);
    const [answers, setAnswers] = useState({
        song: null,
        animal: null,
        party: null,
        smoker: null
    });


    useEffect(() => {
        checkIfHasProfile();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionPosition])

    const checkIfHasProfile = () => {
        if (profile && profile.email) {
            setProfile({ ...profile, lifestyle: answers });
        } else {
            // eslint-disable-next-line no-unused-expressions
            history.push('/'), [history];
        }
    }

    const returnLastPage = async () => {
        history.goBack();
    }

    return (
        <>
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
                                    3 de 4
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            {
                questionPosition === 0 && (
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
                            <Grid item xs={12} sm={8} md={5} elevation={6} square>
                                <Box
                                    sx={{
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textAlign: 'left'
                                    }}
                                >
                                    <Typography component="h1" variant="h4" sx={{
                                        fontWeight: 800
                                    }}>
                                        Mais sobre você
                                    </Typography>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={8}
                                        md={5}
                                        elevation={6}
                                        square>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                textAlign: 'left',
                                            }}
                                        >
                                            <Typography sx={{
                                                fontSize: '16px',
                                                my: 1
                                            }}>
                                                Gostaríamos de lhe fazer apenas <b>4 perguntas</b>!
                                            </Typography>

                                            <Typography sx={{
                                                fontSize: '16px',
                                                my: 1
                                            }}>
                                                A regra é que você participará de um pequeno questionário onde poderá escolher <b>uma resposta entre três alternativas</b>. Tudo bem pra você?
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: '16px',
                                                my: 1
                                            }}>
                                                Quanto mais informações você preencher, mais resultados específicos você obterá.
                                            </Typography>

                                        </Box>
                                    </Grid>

                                    <Box component="form"
                                        noValidate
                                        sx={{
                                            mt: 8,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}>
                                        <Box sx={{
                                            width: '10rem',
                                            height: '10rem',
                                            borderRadius: '50%',
                                            textAlign: 'center',
                                            lineHeight: '10rem',

                                        }}>
                                            <Grid mx={2} sx={{
                                                backgroundColor: 'white',
                                                padding: 2,
                                                borderRadius: 25,
                                                maxWidth: '50px',
                                                maxHeight: '50px'
                                            }}>
                                                <img src={comment} alt="comment-icon" />
                                            </Grid>
                                        </Box>
                                    </Box>

                                    <Box component="form" noValidate>


                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                mt: 6,
                                                mb: 2,
                                                minHeight: '6vh',
                                                fontWeight: 600,
                                                fontSize: 16,
                                                backgroundColor: '#274293'
                                            }}
                                            onClick={() => setQuestionPosition(questionPosition + 1)}
                                        >
                                            Começar o quiz!
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                mb: 2,
                                                minHeight: '6vh',
                                                fontSize: 16,
                                                color: '#274293',
                                                fontWeight: 600,
                                                background: 'none',
                                                border: '1px solid #274293'
                                            }}
                                            component={LinkRouter} to="/account/register/city"
                                        >
                                            Mais tarde
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                )
            }

            {questionPosition === 1 && <Song setQuestionPosition={setQuestionPosition} questionPosition={questionPosition} setAnswers={setAnswers} />}
            {questionPosition === 2 && <Animal setQuestionPosition={setQuestionPosition} questionPosition={questionPosition} setAnswers={setAnswers} />}
            {questionPosition === 3 && <Party setQuestionPosition={setQuestionPosition} questionPosition={questionPosition} setAnswers={setAnswers} />}
            {questionPosition === 4 && <Smoker setQuestionPosition={setQuestionPosition} questionPosition={questionPosition} setAnswers={setAnswers} />}
            {questionPosition === 5 && <Congrats answers={answers} />}

        </>
    )

}