import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Grid, styled, useTheme, Container, Typography, Divider, Button } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

import Label from '../../components/Label';

// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
import { listTransactions } from '../redux/actions/transactionActions';
import Spinner from '../shared/loaders/Spinner';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

export default function History() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'md');

  //  --- Perez Code
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(false);

  const dispatch = useDispatch();
  const plansInfo = useSelector((state) => state.transactionList);
  const { loading, plans } = plansInfo;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('user');
        setUser(data);
      } catch (e) {
        setRedirect(true);
      }
    })();

    dispatch(listTransactions());
  }, []);

  if (redirect) {
    return <Navigate to={'/login'} />;
  }
  return (
    <Page title="Payment Plans">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" align="center" paragraph>
            Thank you for your payments so far!
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            NM MOTOR ADVANCE
          </Typography>
        </Box>

        {loading ? (
          <Spinner />
        ) : (
          <Grid container spacing={isDesktop ? 3 : 5}>
            {plans?.map((plan, index) => {
              return (
                <Grid item xs={12} md={3} key={plan.id}>
                  <RootStyle>
                    <Typography variant="subtitle1" sx={{ mb: 5 }}>
                      NO: {index + 1}
                    </Typography>

                    <Stack spacing={2.5}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
                          Paid On:
                        </Typography>
                        <Label color="error" variant="filled" style={{ color: '#f2f2f2', backgroundColor: 'green' }}>
                          {plan.createdAt}
                        </Label>
                      </Stack>
                      <Stack direction="row" justifyContent="flex-end">
                        <Typography sx={{ color: 'text.secondary' }}>UGX</Typography>
                        <Typography variant="h4" sx={{ mx: 1 }}>
                          {plan.amount_paid}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ mb: 1, alignSelf: 'flex-end', color: 'text.secondary' }}
                        >
                          /Week
                        </Typography>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                      </Stack>

                      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
                        *Recieved from {plan.payment_method} - <b>{plan.phone}</b>
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
                        * TRANSACTION ID: {plan.transaction_id}
                      </Typography>

                      <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="outlined"
                        loading="{isSubmitting}"
                        sx={{ mt: 5, mb: 3 }}
                      >
                        <RouterLink
                          to={`/beneficiary/receipt/${plan.id}`}
                          style={{ textDecoration: 'none', color: '#f2f2f2' }}
                        >
                          VIEW RECEIPT
                        </RouterLink>
                      </Button>

                      <Stack alignItems="center" spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
                          <Typography variant="subtitle2">Secure Mobile Mobile payment</Typography>
                        </Stack>

                        <img src="../logo/paid.png" alt="Paid off" style={{ marginTop: '-5px' }} width="40%" />
                      </Stack>
                    </Stack>
                  </RootStyle>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Page>
  );
}
