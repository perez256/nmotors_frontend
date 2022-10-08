import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import * as moment from 'moment';
import {
  Box,
  Stack,
  Grid,
  styled,
  useTheme,
  Card,
  Container,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
// components
import Page from '../../components/Page';
import PaymentSummary from '../shared/payment/PaymentSummary';
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function PayDetail() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'md');
  const { id } = useParams();

  // get installment details
  const [installment, setInstallment] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`transactions/${id}`);
      setInstallment(data);
    })();
  }, []);
  console.log('installment details', installment);

  // Calculate Interest based on late payment
  // Today date
  const current = new Date();
  // Remove 7 days
  const expectedPayDate = installment?.start_date;
  const sevenDaysBack = moment(expectedPayDate).subtract(1, 'w').format('YYYY-MM-DD');
  const todayDate = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;
  console.log('Todays date', todayDate);
  // compare if (firstweek day < todays date)

  let interest = 0.0;
  if (sevenDaysBack < todayDate && installment.status === 'Not Paid') {
    console.log('sevenDaysBack  is below today date');
    // yes -- set interest to 0.3 X 300,000
    interest = 0.03 * parseFloat(installment.expected_install_amt);
  } else {
    console.log('sevenDaysBack is above today date');
    // NO -- set interest to 0.00
    interest = 0.0;
  }

  // Radio
  const [value, setValue] = React.useState('MTN');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Page title="Payment Plans">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" align="center" paragraph>
            Let's finish your payment!
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            NM MOTOR ADVANCE
          </Typography>
        </Box>
        <Grid container spacing={isDesktop ? 3 : 5}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: 'grid',
                gap: 5,
                p: { md: 5 },
                borderRadius: 2,
                border: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
              }}
            >
              <div>
                <Typography variant="subtitle1">Installment Information</Typography>
                <Stack spacing={3} mt={5}>
                  <TextField
                    fullWidth
                    helperText="Installment Amount"
                    value={installment.expected_install_amt}
                    disabled
                  />
                  <TextField fullWidth helperText="Late payment Interest charge (0.03%)" value={interest} disabled />
                  <TextField fullWidth helperText="Installment  Date" value={installment.start_date} disabled />
                </Stack>
              </div>

              <div>
                <Typography variant="subtitle1" sx={{ mb: 5 }}>
                  Payment Method
                </Typography>

                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <Stack direction="horrizontal">
                      <FormControlLabel value="MTN" control={<Radio />} label="MTN MONEY" />
                      <FormControlLabel value="AIRTEL" control={<Radio />} label="AIRTEL MONEY" />
                    </Stack>

                    {value === 'MTN' ? (
                      <>
                        <TextField fullWidth helperText="Your MTN Number" value="0774534534" disabled />
                        <Card>
                          <img src="../../logo/mtn.png" alt="MTN" />
                        </Card>
                      </>
                    ) : (
                      <>
                        <TextField fullWidth helperText="Your AIRTEL Number" value="075243800" disabled />
                        <Card>
                          <img src="../../logo/airtel.png" alt="MTN" />
                        </Card>
                      </>
                    )}
                  </RadioGroup>
                </FormControl>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentSummary
              amountExpected={installment.expected_install_amt}
              interest={interest}
              startDate={installment.start_date}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
