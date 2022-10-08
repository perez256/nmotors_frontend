import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import axios from 'axios';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
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

  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <Avatar src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg" alt="NM Motors" />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            <RouterLink to={'/profile'} style={{ color: 'white', textDecoration: 'none' }}>
              {user?.first_name} {user?.last_name}
            </RouterLink>
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            Staff
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
