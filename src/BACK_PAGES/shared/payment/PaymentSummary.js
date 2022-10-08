import React from 'react';
import { styled, Switch, Divider, Typography, Stack, Button } from '@mui/material';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';

// components

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

// ----------------------------------------------------------------------

export default function PaymentSummary(props) {
  const total = parseFloat(props.amountExpected) + parseFloat(props.interest);

  // Pay your installment React logic Here

  // update the loan in the backend

  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Total Summary
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Powered By:
          </Typography>
          <Label color="error" variant="filled">
            SSL
          </Label>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Typography sx={{ color: 'text.secondary' }}>UGX</Typography>
          <Typography variant="h4" sx={{ mx: 1 }}>
            {total}
          </Typography>
          <Typography component="span" variant="body2" sx={{ mb: 1, alignSelf: 'flex-end', color: 'text.secondary' }}>
            /Week
          </Typography>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
          * Please Note that 0.03% Late payment Interest may be applied
        </Typography>
       
        <Button fullWidth size="large" type="submit" variant="contained" sx={{ mt: 5, mb: 3 }}>
          CONFIRM PAYMENT
        </Button>

        <Stack alignItems="center" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
            <Typography variant="subtitle2">Secure Mobile Mobile payment</Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            This is a secure 128-bit SSL encrypted payment
          </Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
