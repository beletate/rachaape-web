import * as React from 'react';
import { useHistory } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

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
          <IconButton color="inherit" aria-label="home"
            onClick={() => changeRoute('home')}>
            <HomeOutlinedIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" aria-label="search"
          onClick={() => changeRoute('search')}>
            <SearchIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" aria-label="chat"
          onClick={() => changeRoute('chat')}>
            <ChatBubbleOutlineOutlinedIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" aria-label="profile"
          onClick={() => changeRoute('profile')}>
            <PermIdentityOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
