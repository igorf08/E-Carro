import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, MenuList } from "@mui/material";
import DriveEtaRoundedIcon from '@mui/icons-material/DriveEtaRounded';
import MenuOpen from '@mui/icons-material/MenuOpen';
import Stack from '@mui/system/Stack';
import { Link } from "react-router-dom";
import "../../styles/style.css"

//Hamburger open/close handlers.
const Nav = () => {
  const [anchorNav, setAnchorNav] = useState(null);
  const openMenu = ({ currentTarget }) => {
    setAnchorNav(currentTarget);
  }
  const closeMenu = () => {
    setAnchorNav(null);
  }

  return (
    <AppBar sx={{ display: 'flex', w: '100%' }} position="static">
      <Toolbar>
        <IconButton aria-label='logo' color='inherit' size='large' edge='start' sx={{ display: { xs: 'none', md: 'flex' } }}>
          <DriveEtaRoundedIcon />
        </IconButton>
        <Typography variant='h3' component='div' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>E-Carro</Typography>
        <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit"><Link to='/'>Ofertas</Link></Button>
          <Button color="inherit"><Link to="/administracao">Administração</Link></Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" edge="start" color="inherit" onClick={openMenu}>
            <MenuOpen />
          </IconButton>
          <Menu anchorEl={anchorNav} open={Boolean(anchorNav)} onClose={closeMenu} sx={{ display: {xs: 'flex', md: 'none' }}}>
            <MenuList>
              <MenuItem onClick={closeMenu}><Link to="/">Ofertas</Link></MenuItem>
              <MenuItem onClick={closeMenu}><Link to="/administracao">Administração</Link></MenuItem>
            </MenuList>
          </Menu>
        </Stack>
        <Typography variant='h3' component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>E-Carro</Typography>
      </Toolbar>
    </AppBar >
  );
};

export default Nav;
