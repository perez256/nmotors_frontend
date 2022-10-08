import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Table,
  Divider,
  TableRow,
  Container,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';

import useSettings from '../../hooks/useSettings';
// components
import Scrollbar from '../../components/Scrollbar';
import Page from '../../components/Page';
import Label from '../../components/Label';


const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function Receipt() {
  const { themeStretch } = useSettings();
  const [receipt, setReceipt] = useState(false);
  // get receipt details
  const { id } = useParams();
  // console.log(id);
  const mytotal = parseFloat(receipt.interest) + parseFloat(receipt.amount_paid)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`receipt/${id}`);
        console.log(data);
        setReceipt(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Page title="Ecommerce: Invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography variant="h6">NM MOTOR CARE</Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                  Receipt
                </Label>
                <Typography variant="h6">TRANSACTION ID: {receipt.transaction_id}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Receipt To
              </Typography>
              <Typography variant="body2">Mr John K</Typography>
              <Typography variant="body2">address</Typography>
              <Typography variant="body2">Phone: {receipt.phone}</Typography>
            </Grid>
          </Grid>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' },
                  }}
                >
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Installment Week</TableCell>
                    <TableCell align="right">Installment Amount</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow
                    key="{index}"
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>1</TableCell>
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">
                          {receipt.payment_method} - {receipt.phone}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {receipt.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{receipt.payment_for_dates}</TableCell>
                    <TableCell align="right">{receipt.amount_paid}</TableCell>
                    <TableCell align="right">{receipt.amount_paid}</TableCell>
                  </TableRow>

                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">{receipt.amount_paid}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="body1">Interest Charge</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Typography variant="body1">{receipt.interest}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell align="right" width={140}>
                      <Typography variant="h6">{mytotal}</Typography>
                    </TableCell>
                  </RowResultStyle>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Divider sx={{ mt: 5 }} />

          <Grid container>
            <Grid item xs={12} md={9} sx={{ py: 3 }}>
              <Typography variant="subtitle2">NOTES</Typography>
              <Typography variant="body2">We appreciate your business with us.</Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
              <Typography variant="subtitle2">Have a Question?</Typography>
              <Typography variant="body2">support@mnmotors.com</Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
