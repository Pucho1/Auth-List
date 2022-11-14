import React, {useState} from 'react';
import { useAuthStore } from '../store/AuthContext';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useLogout } from '../hooks/useLogout';
import { Grid } from '@mui/material';

function Header() {
  const authStore= useAuthStore();
  const {logout} = useLogout();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container className='conttainer_header' maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container>

            <Grid item sx={{
              display:{ xs: 'flex'},
              height:'30px',
              alignItems:'center',
              marginTop:'10px',
              width:'100%'
            }} >
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                    TEST
                </Typography>
                
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link className="link_header" to="/">Auth</Link>
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link className="link_header" to="/register">Register</Link>
                      </Typography>
                    </MenuItem>
                    { authStore.isAuthenticated === true && (
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link className="link_header" to="/user">UserList</Link>
                        </Typography>
                      </MenuItem>
                    )}
                  </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  TEST
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                { !authStore.isAuthenticated ? (
                  <>
                      <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                      <Link className="link_header" to="/">Auth</Link>
                      </Button>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                      <Link className="link_header" to="/register">register</Link>
                    </Button>
                  </>
                  ) : (
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      <Link className="link_header" to="/user">UserList</Link>
                    </Button>
                  )}
                  
                </Box>
                
                {authStore.isAuthenticated && (
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem  onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>)}
            </Grid>
            <Grid item xs={12} sx={{margin:'10px 0px', paddingLeft: '12px'}}>
              <Box>
                aqui van los colores 
              </Box>
            </Grid>
          </Grid>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;