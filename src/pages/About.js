import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <><Navbar/>
    
    <Container >
        
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          About Loan Calculator
        </Typography>
        <Typography paragraph>
          This application helps users calculate loan EMIs (Equated Monthly Installments) 
          with detailed amortization schedules and real-time currency conversion.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Features:
        </Typography>
        <ul>
          <li><Typography>EMI Calculation using standard financial formulas</Typography></li>
          <li><Typography>Dynamic amortization schedule</Typography></li>
          <li><Typography>Real-time currency conversion</Typography></li>
          <li><Typography>Dark/Light mode toggle</Typography></li>
        </ul>
      </Box>
    </Container>
    </>
  );
};

export default About;