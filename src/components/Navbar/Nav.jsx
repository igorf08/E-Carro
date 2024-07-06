import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import DriveEtaRoundedIcon from '@mui/icons-material/DriveEtaRounded';
import Menu from '@mui/icons-material/Menu';
import Stack from '@mui/system/Stack';
import { Link } from "react-router-dom";
import "../../styles/style.css"

const Nav = () => {
  return (
    <AppBar sx={{display: 'flex', w: '100%', border: 2}}>
      <Toolbar>
        <IconButton aria-label='logo' color='inherit' size='large' edge='start' sx={{display: {xs: 'none', md: 'flex'}}} >
          <DriveEtaRoundedIcon/>
        </IconButton>
          <Typography variant='h3' component='div' sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>E-Carro</Typography>
      <Stack direction="row" spacing={2} sx={{display: {xs: 'none', md: 'flex'}}}>
        <Button color="inherit"><Link to='/'>Ofertas</Link></Button>
        <Button color="inherit">Administração</Button>
      </Stack>
      <Stack direction="row" spacing={2} sx={{display: {xs: 'flex', md: 'none'}}}>
        <IconButton size="large" edge="start" color="inherit">
          <Menu/>
        </IconButton>
      </Stack>
      </Toolbar>
      
    </AppBar >
  );
};

export default Nav;
