import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './currencyContainer.style';
import format from 'date-fns/format';
import CurrencyInputContainer from './CurrencyInputContainer/CurrencyInputContainer';
import CurrencyDisplay from './CurrencyDisplay/CurrencyDisplay';

const CurrencyContainer = () => {
  const [amount, setAmount] = useState({ value: '', isValid: true });
  const [from, setFrom] = useState({ name: '', symbol: '', isValid: true });
  const [to, setTo] = useState({ name: '', symbol: '', isValid: true });
  const [rate, setRate] = useState(0);
  const [date, setDate] = useState({
    value: format(new Date(), 'yyyy-MM-dd'),
    isValid: true,
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
      >
        Currency Calculator
      </Typography>
      <CurrencyInputContainer
        amount={amount}
        setAmount={setAmount}
        to={to}
        setTo={setTo}
        from={from}
        setFrom={setFrom}
        date={date}
        setDate={setDate}
        rate={rate}
        setRate={setRate}
      />
      {rate !== 0 && (
        <CurrencyDisplay
          amount={amount.value}
          to={to}
          from={from}
          date={date.value}
          rate={rate}
        />
      )}
    </div>
  );
};

export default CurrencyContainer;
