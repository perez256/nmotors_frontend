import React from 'react';
import {
  Box,
  Stack,
  Grid,
  CardContent,
  styled,
  alpha,
  useTheme,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
} from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// hooks
import useSettings from '../../hooks/useSettings';

export default function Account() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="Payment Plans">
      <Container maxWidth={themeStretch ? false : 'xl'}>Your Account</Container>
    </Page>
  );
}
