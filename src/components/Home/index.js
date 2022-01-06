import React, { useEffect, useState } from 'react'

// Mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Header from '../Header'
import getUser from '../../db/getUsers';

import AvatarJPG from '../../assets/images/avatar.jpg';

export default function Home() {

    const [users, setUsers] = useState(undefined);

    useEffect(() => {
        async function fetchUser() {
            await getUser().then(res => setUsers(res));
        }
    })

    return (
        <>
            <Header />
            <h1>Aqui fica os filtros e tals</h1>
            <Container fixed>
                <Box mt={6} sx={{ bgcolor: '#cfe8fc', height: '20vh' }}>
                    <List sx={{ width: '100%', height: '20vh' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar sx={{height: '14vh', width: '14vh'}} alt="Remy Sharp" src={AvatarJPG} />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{margin: '2vh'}}
                                primary="Vinicius Beletate"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Caseiro
                                        </Typography>
                                        {" — Busco uma pessoa para compartilhar um apartamento em Pouso Alegre - MG"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </Box>
            </Container>
        </>
    )
}