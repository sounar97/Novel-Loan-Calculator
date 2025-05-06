export const useEmiCalculator = () => {
    const calculateEmi = (principal, annualRate, tenureMonths) => {
      const monthlyRate = annualRate / 12 / 100;
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                  (Math.pow(1 + monthlyRate, tenureMonths) - 1);
      return emi.toFixed(2);
    };
  
    const generateAmortizationSchedule = (principal, annualRate, tenureMonths) => {
      const monthlyRate = annualRate / 12 / 100;
      const emi = calculateEmi(principal, annualRate, tenureMonths);
      let balance = principal;
      const schedule = [];
  
      for (let month = 1; month <= tenureMonths; month++) {
        const interest = balance * monthlyRate;
        const principalPaid = emi - interest;
        balance -= principalPaid;
  
        schedule.push({
          month,
          principal: parseFloat(principalPaid.toFixed(2)),
          interest: parseFloat(interest.toFixed(2)),
          balance: Math.abs(parseFloat(balance.toFixed(2))),
        });
      }
      return schedule;
    };
  
    return { calculateEmi, generateAmortizationSchedule };
  };