import * as React from 'react';
import { useHistory } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export default function NavBar() {
  const history = useHistory();

  const changeRoute = (route) => {
    // eslint-disable-next-line no-unused-expressions
    history.push(`/${route}`), [history]
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: "#274293" }}>
        <Toolbar>
        <Box  sx={{ flexGrow: 0.3 }}/>
          <IconButton color="inherit" aria-label="home"
            onClick={() => changeRoute('home')}>
            <HomeOutlinedIcon />
          </IconButton>
          {/* <IconButton color="inherit" aria-label="search"
          onClick={() => changeRoute('search')}>
            <SearchIcon />
          </IconButton>
          <Box  /> */}
          {/* <IconButton color="inherit" aria-label="chat"
          onClick={() => changeRoute('chat')}>
            <ChatBubbleOutlineOutlinedIcon />
          </IconButton> */}
          <Box  sx={{ flexGrow: 0.4 }}/>
          <IconButton color="inherit" aria-label="profile"
          onClick={() => changeRoute('profile')}>
            <PermIdentityOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
