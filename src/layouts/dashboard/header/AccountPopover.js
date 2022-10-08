import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, Navigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, MenuItem, Typography, Stack, Avatar } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: '#',
  },
  {
    label: 'Settings',
    linkTo: '#',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //  --- Perez Code
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(false);

  // === Perez is authenticated code
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('user');
        console.log(data);
        setUser(data);
      } catch (e) {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  // Louout User
  const logout = async () => {
    await axios.post('/logout');
  };

  return (
    <>
      <IconButtonAnimate
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg" alt="NM Motors" />
      </IconButtonAnimate>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            <RouterLink to={'/profile'} style={{ color: 'white', textDecoration: 'none' }}>
              {user?.first_name} {user?.last_name}
            </RouterLink>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            <small>{user?.email}</small>
          </Typography>
        </Box>

        <Divider />
        <Stack spacing={0.5} sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2, borderRadius: 1 }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        <Divider />

        <MenuItem sx={{ typography: 'body2', py: 1, px: 2, borderRadius: 1, m: 1 }}>
          <RouterLink to={'/login'} onClick={logout} style={{ color: 'white', textDecoration: 'none' }}>
            Logout
          </RouterLink>
        </MenuItem>
      </MenuPopover>
    </>
  );
}
