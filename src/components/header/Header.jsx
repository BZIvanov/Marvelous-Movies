import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { useSelector } from '../../providers/store/store';
import { selectUser } from '../../providers/store/features/user/userSlice';
import { selectCart } from '../../providers/store/features/cart/cartSlice';
import { useLogoutMutation } from '../../providers/store/services/users';
import {
  AddBusinessIcon,
  AddShoppingCartIcon,
  HomeIcon,
  LoginIcon,
  PersonAddIcon,
} from '../mui/Icons';
import HeaderNavLink from './HeaderNavLink';
import HeaderSearch from './HeaderSearch';
import { useIsApiRequestPending } from '../../hooks/useIsApiRequestPending';

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenDashboard = () => {
    handleCloseUserMenu();
    navigate(`/${user.role === 'admin' ? 'admin' : 'user'}/orders`);
  };

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  const isApiLoading = useIsApiRequestPending();

  return (
    <>
      <AppBar position='fixed'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters={true}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <HeaderNavLink toLink='/' linkText='Home' icon={<HomeIcon />} />
                <HeaderNavLink
                  toLink='/shop'
                  linkText='Shop'
                  icon={<AddBusinessIcon />}
                />
                <HeaderNavLink
                  toLink='/cart'
                  linkText='Cart'
                  icon={
                    <Badge
                      badgeContent={Object.keys(cart).length}
                      color='secondary'
                    >
                      <AddShoppingCartIcon />
                    </Badge>
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <HeaderSearch />

                {user ? (
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title='Open settings'>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt='User avatar'
                          src={user?.avatar?.imageUrl}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id='menu-appbar'
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted={true}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleOpenDashboard}>
                        <Typography sx={{ textAlign: 'center' }}>
                          Dashboard
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <Typography sx={{ textAlign: 'center' }}>
                          Logout
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <>
                    <HeaderNavLink
                      toLink='/register'
                      linkText='Register'
                      icon={<PersonAddIcon />}
                    />
                    <HeaderNavLink
                      toLink='/login'
                      linkText='Login'
                      icon={<LoginIcon />}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>

        {isApiLoading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant='indeterminate'
              color='secondary'
              sx={{ height: '2px' }}
            />
          </Box>
        )}
      </AppBar>

      {/* Render second toolbar so the page content won't hide behind the first ttolbar  */}
      <Toolbar />
    </>
  );
};

export default Header;
