import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { Box, Stack, Grid, CardContent, styled, alpha, useTheme, Card, Container, Typography } from '@mui/material';
import Iconify from '../../components/Iconify';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

export default function Home() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const percent = 5;
  // === Perez is authenticated code
  const [user, setUser] = useState(false);
  const [redirect, setRedirect] = useState(false);

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
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <CardContent
              sx={{
                p: { md: 0 },
                pl: { md: 5 },
                color: 'grey.800',
              }}
            >
              <Typography gutterBottom variant="h4" style={{ color: '#5d6e82' }}>
                Welcome back, {user.first_name}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4">YOU PAID</Typography>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
                  <IconWrapperStyle
                    sx={{
                      ...(percent < 0 && {
                        color: 'error.main',
                        bgcolor: alpha(theme.palette.error.main, 0.16),
                      }),
                    }}
                  >
                    <Iconify
                      width={16}
                      height={16}
                      icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
                    />
                  </IconWrapperStyle>
                  <Typography component="span" variant="subtitle2">
                    {percent > 0 && '+'}
                  </Typography>
                  <Typography variant="p">UGX 100,000</Typography>
                </Stack>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4">BALANCE</Typography>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
                  <IconWrapperStyle
                    sx={{
                      ...(percent < 0 && {
                        color: 'error.main',
                        bgcolor: alpha(theme.palette.error.main, 0.16),
                      }),
                    }}
                  >
                    <Iconify
                      width={16}
                      height={16}
                      icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
                    />
                  </IconWrapperStyle>
                  <Typography component="span" variant="subtitle2">
                    {percent > 0 && '+'}
                  </Typography>
                  <Typography variant="p">UGX 30,000,000</Typography>
                </Stack>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <RouterLink to={`/beneficiary/plans`} style={{ textDecoration: 'none', color: '#f2f2f2' }}>
                  <Typography variant="h4">PAY NOW</Typography>

                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
                    <IconWrapperStyle
                      sx={{
                        ...(percent < 0 && {
                          color: 'error.main',
                          bgcolor: alpha(theme.palette.error.main, 0.16),
                        }),
                      }}
                    >
                      <Iconify
                        width={16}
                        height={16}
                        icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
                      />
                    </IconWrapperStyle>
                    PAY YOUR VEHICLE
                  </Stack>
                </RouterLink>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
