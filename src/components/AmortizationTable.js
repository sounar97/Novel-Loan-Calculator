import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AmortizationTable = ({ schedule, currency }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Amortization Schedule ({currency})</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Principal</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>Remaining Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.slice(0, 12).map((row) => (
            <TableRow key={row.month}>
              <TableCell>{row.month}</TableCell>
              <TableCell>{currency} {row.principal.toFixed(2)}</TableCell>
              <TableCell>{currency} {row.interest.toFixed(2)}</TableCell>
              <TableCell>{currency} {row.balance.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AmortizationTable;