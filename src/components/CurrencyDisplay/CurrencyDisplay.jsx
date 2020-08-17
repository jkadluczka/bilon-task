import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { currencyOptions } from './../../constants/currencyConstants';
import { getRates } from './../../actions/currencyActions';
import useStyles from './currencyDisplay.style';
import SyncIcon from '@material-ui/icons/Sync';
import format from 'date-fns/format';

const CurrencyDisplay = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState({ name: '' });
  const [to, setTo] = useState({ name: '' });
  const [rate, setRate] = useState(0);

  const classes = useStyles();

  const handleChangeAmount = (event) => {
    event.target.value >= 0 && setAmount(event.target.value);
  };

  const handleChangeFrom = (event, value, reason) => {
    reason === 'clear' ? setFrom({ name: '' }) : setFrom(value);
  };

  const handleChangeTo = (event, value, reason) => {
    reason === 'clear' ? setTo({ name: '' }) : setTo(value);
  };

  const handleSwap = () => {
    let tempValue = from;
    setFrom(to);
    setTo(tempValue);
    setRate(1 / rate);
  };

  const handleCalculateRates = async () => {
    if (from.symbol && to.symbol && amount > 0) {
      const result = await getRates(from.symbol, to.symbol);

      result.success &&
        setRate(result.rates[to.symbol] / result.rates[from.symbol]);
    }
  };

  const getCalculatedAmount = (amount) => Math.round(amount * rate * 100) / 100;

  const getToday = () => format(new Date(), 'dd MMMM yyyy');

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
      <div className={classes.inputContainer}>
        <TextField
          label="Amount"
          value={amount}
          onChange={handleChangeAmount}
          type="number"
          variant="outlined"
          className={classes.numberInput}
        />

        <Autocomplete
          options={currencyOptions}
          getOptionLabel={(option) => option.name}
          inputValue={from.name}
          onChange={handleChangeFrom}
          className={classes.autocompleteInput}
          renderInput={(params) => (
            <TextField {...params} label="From" variant="outlined" />
          )}
        />
        <Button onClick={handleSwap} className={classes.swapButton}>
          <SyncIcon />
        </Button>
        <Autocomplete
          options={currencyOptions}
          getOptionLabel={(option) => option.name}
          inputValue={to.name}
          onChange={handleChangeTo}
          className={classes.autocompleteInput}
          renderInput={(params) => (
            <TextField {...params} label="To" variant="outlined" />
          )}
        />
        <Button onClick={handleCalculateRates}>calculate</Button>
      </div>
      {rate !== 0 && (
        <div className={classes.data}>
          <Typography variant="body1">{`${amount} ${
            from.name
          } = ${getCalculatedAmount(amount)} ${to.name}`}</Typography>
          <Typography variant="body2">
            {`1 ${from.symbol} = ${getCalculatedAmount(1)} ${
              to.symbol
            } on ${getToday()} `}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CurrencyDisplay;
