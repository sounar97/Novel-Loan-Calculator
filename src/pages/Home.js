import React, { useContext, useState } from "react";
import { useEmiCalculator } from "../hooks/useEmiCalculator";
import { AppContext } from "../context/AppContext";
import { 
  Box, Button, Card, CardContent, Container, TextField, Typography, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Select, MenuItem, FormControl, InputLabel, Grid
} from "@mui/material";
import Navbar from "../components/Navbar";

const Home = () => {
  const { currency, setCurrency, theme } = useContext(AppContext);
  const { calculateEmi, generateAmortizationSchedule } = useEmiCalculator();
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [termYears, setTermYears] = useState(5);
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const handleCalculate = () => {
    const calculatedEmi = calculateEmi(loanAmount, interestRate, termYears * 12);
    setEmi(Number(calculatedEmi) || 0);
    setSchedule(generateAmortizationSchedule(loanAmount, interestRate, termYears * 12));
  };

  const handleReset = () => {
    setEmi(null);
    setSchedule([]);
  };

  const formatCurrency = (value) => {
    return value ? `${currency} ${Number(value).toFixed(2)}` : `${currency} 0.00`;
  };

  return (
    <>
      <Navbar />
      <Container 
        maxWidth={false}
        sx={{ 
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
          backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        {/* Loan Calculator Dashboard */}

        
        {/* Input Form Card */}
        <Card sx={{ 
          mb: 4, 
          boxShadow: 3,
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'
        }}>
          <CardContent>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                color: theme === 'dark' ? '#ffffff' : 'inherit',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Loan Calculator Dashboard
            </Typography>
            
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Loan Amount"
                  type="number"
                  fullWidth
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme === 'dark' ? '#555' : '#ccc',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Interest Rate (%)"
                  type="number"
                  fullWidth
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme === 'dark' ? '#555' : '#ccc',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Term (Years)"
                  type="number"
                  fullWidth
                  value={termYears}
                  onChange={(e) => setTermYears(parseInt(e.target.value))}
                  inputProps={{ min: 1, max: 30 }}
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme === 'dark' ? '#555' : '#ccc',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            </Box>
            <Button 
                variant="contained" 
                onClick={handleCalculate}
                sx={{ 
                  px: 4, 
                  py: 1,
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                CALCULATE
              </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {emi !== null && (
          <>
            {/* EMI Display Card */}
            <Card sx={{ 
              mb: 4, 
              boxShadow: 3,
              backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'
            }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  color: theme === 'dark' ? '#ffffff' : 'inherit',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 0 }
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    Monthly EMI: {formatCurrency(emi)}
                  </Typography>
                  <FormControl sx={{ minWidth: 120, width: { xs: '100%', sm: 'auto' } }}>
                    <InputLabel sx={{ color: theme === 'dark' ? '#ffffff' : 'inherit' }}>
                      Currency
                    </InputLabel>
                    <Select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      label="Currency"
                      size="small"
                      sx={{
                        backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
                        color: theme === 'dark' ? '#ffffff' : 'inherit',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme === 'dark' ? '#555' : '#ccc',
                        },
                      }}
                    >
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="INR">INR</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>

            {/* Amortization Table Card */}
            <Card sx={{ 
              boxShadow: 3,
              backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'
            }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 2,
                  color: theme === 'dark' ? '#ffffff' : 'inherit',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 0 }
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    Amortization Schedule ({currency})
                  </Typography>
                  <Button 
                    variant="outlined" 
                    onClick={handleReset}
                    size="small"
                    sx={{
                      color: theme === 'dark' ? '#ffffff' : 'inherit',
                      borderColor: theme === 'dark' ? '#555' : '#ccc',
                      width: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    Reset Table
                  </Button>
                </Box>
                
                <TableContainer 
                  component={Paper} 
                  sx={{ 
                    maxHeight: 500,
                    backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
                    overflowX: 'auto'
                  }}
                >
                  <Table size="small" sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ 
                          fontWeight: 'bold',
                          backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
                          color: theme === 'dark' ? '#ffffff' : 'inherit'
                        }}>
                          Month
                        </TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold',
                          backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
                          color: theme === 'dark' ? '#ffffff' : 'inherit'
                        }} align="right">
                          Principal
                        </TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold',
                          backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
                          color: theme === 'dark' ? '#ffffff' : 'inherit'
                        }} align="right">
                          Interest
                        </TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold',
                          backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
                          color: theme === 'dark' ? '#ffffff' : 'inherit'
                        }} align="right">
                          Remaining Balance
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schedule.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell sx={{ 
                            color: theme === 'dark' ? '#ffffff' : 'inherit'
                          }}>
                            {row.month}
                          </TableCell>
                          <TableCell align="right" sx={{ 
                            color: theme === 'dark' ? '#ffffff' : 'inherit'
                          }}>
                            {formatCurrency(row.principal)}
                          </TableCell>
                          <TableCell align="right" sx={{ 
                            color: theme === 'dark' ? '#ffffff' : 'inherit'
                          }}>
                            {formatCurrency(row.interest)}
                          </TableCell>
                          <TableCell align="right" sx={{ 
                            color: theme === 'dark' ? '#ffffff' : 'inherit'
                          }}>
                            {formatCurrency(row.balance)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;