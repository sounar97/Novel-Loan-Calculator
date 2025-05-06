import { useState, useCallback } from 'react';
import axios from 'axios';

export const useExchangeRate = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRates = useCallback(async (baseCurrency = 'USD') => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/0fb9617eea12ff7ca97bbddc/latest/${baseCurrency}`
      );
      setRates(response.data.conversion_rates);
    } catch (err) {
      setError(err.message || 'Failed to fetch exchange rates');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { rates, loading, error, fetchRates };
};