import React, { useState, useEffect, useCallback } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, CircularProgress, Alert, Select, MenuItem, 
  InputLabel, FormControl, Box, TextField, Grid, Button, useMediaQuery, useTheme
} from '@mui/material';
import { useExchangeRate } from '../hooks/useExchangeRate';
import Navbar from '../components/Navbar';

const ExchangeRates = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { rates, loading, error, fetchRates } = useExchangeRate();
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [amount, setAmount] = useState(1);
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [lastUpdated, setLastUpdated] = useState(null);

  // Memoized fetch function
  const fetchData = useCallback(() => {
    fetchRates(baseCurrency);
    setLastUpdated(new Date());
  }, [baseCurrency, fetchRates]);

  // Initial fetch and when base currency changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate converted amount
  const convertedAmount = rates && targetCurrency 
    ? (amount * rates[targetCurrency]).toFixed(2)
    : '0.00';

  // Handler functions
  const handleBaseCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value) || 0);
  };

  // Filter and limit displayed rates
  const displayedRates = rates 
    ? Object.entries(rates)
        .filter(([curr]) => curr !== baseCurrency)
        .slice(0, isMobile ? 10 : 20)
    : [];

  return (
    <>
      <Navbar />
      <Box sx={{ 
        p: { xs: 2, sm: 3 },
        maxWidth: '100%',
        overflowX: 'hidden'
      }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          Currency Converter
        </Typography>

        {/* Conversion Form */}
        <Box component="form" sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                InputProps={{ inputProps: { min: 0 } }}
                size={isMobile ? 'small' : 'medium'}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>From Currency</InputLabel>
                <Select
                  value={baseCurrency}
                  onChange={handleBaseCurrencyChange}
                  label="From Currency"
                >
                  {['USD', 'EUR', 'GBP', 'INR', 'AED'].map(curr => (
                    <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>To Currency</InputLabel>
                <Select
                  value={targetCurrency}
                  onChange={handleTargetCurrencyChange}
                  label="To Currency"
                >
                  {['USD', 'EUR', 'GBP', 'INR', 'AED'].map(curr => (
                    <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button 
                variant="contained" 
                onClick={fetchData}
                fullWidth
                sx={{ 
                  height: isMobile ? '40px' : '56px',
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}
              >
                Refresh Rates
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Conversion Result */}
        <Box sx={{ 
          backgroundColor: 'primary.main', 
          color: 'primary.contrastText', 
          p: { xs: 2, sm: 3 }, 
          borderRadius: 1,
          mb: 4,
          textAlign: 'center'
        }}>
          <Typography variant={isMobile ? 'h6' : 'h5'}>
            {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
          </Typography>
          
        </Box>

        {/* Exchange Rates Table */}
        <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
          Live Exchange Rates (Base: {baseCurrency})
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table size={isMobile ? 'small' : 'medium'} stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Currency</TableCell>
                  <TableCell align="right">Rate (1 {baseCurrency})</TableCell>
                  {!isMobile && (
                    <TableCell align="right">Converted (100 {baseCurrency})</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRates.map(([curr, rate]) => (
                  <TableRow key={curr} hover>
                    <TableCell>{curr}</TableCell>
                    <TableCell align="right">{rate.toFixed(6)}</TableCell>
                    {!isMobile && (
                      <TableCell align="right">
                        {(100 * rate).toFixed(2)} {curr}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default ExchangeRates;