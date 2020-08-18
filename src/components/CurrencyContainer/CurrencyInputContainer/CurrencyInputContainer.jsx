import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { getRates } from '../../../actions/currencyActions';
import useStyles from './currencyInputContainer.style';
import SyncIcon from '@material-ui/icons/Sync';
import CurrencyAutosuggest from './CurrencyAutosuggest/CurrencyAutosuggest';
import isAfter from 'date-fns/isAfter';

const CurrencyInputContainer = (props) => {
  const {
    amount,
    setAmount,
    rate,
    setRate,
    to,
    setTo,
    from,
    setFrom,
    date,
    setDate,
  } = props;

  const classes = useStyles();

  const handleChangeAmount = (event) => {
    event.target.value >= 0 &&
      setAmount({ ...amount, value: event.target.value });
  };

  const handleSwap = () => {
    let tempValue = from;
    setFrom(to);
    setTo(tempValue);
    rate !== 0 && setRate(1 / rate);
  };

  const validateData = () => {
    !from.name && setFrom({ ...from, isValid: false });
    !to.name && setTo({ ...to, isValid: false });
    !date.value ||
      (isAfter(new Date(date.value), new Date()) &&
        setDate({ ...date, isValid: false }));
    !amount.value && setAmount({ ...amount, isValid: false });

    return from.name && to.name && date.value && amount.value;
  };

  const handleCalculateRates = async () => {
    if (validateData()) {
      setAmount({
        ...amount,
        value: String(parseInt(String(amount.value), 10)),
      });

      const result = await getRates(from.symbol, to.symbol, date.value);

      result.success
        ? setRate(result.rates[to.symbol] / result.rates[from.symbol])
        : setRate(0);
    }
  };

  const handleDateChange = async (e, value) => {
    e.persist();

    await setDate({ ...date, value: String(e.target.value) });

    setRate(0);
  };

  return (
    <div className={classes.inputContainer}>
      <TextField
        label="Amount"
        value={amount.value}
        onChange={handleChangeAmount}
        type="number"
        error={!amount.isValid}
        onFocus={() => {
          setAmount({ ...amount, isValid: true });
        }}
        variant="outlined"
        className={classes.numberInput}
      />
      <CurrencyAutosuggest
        setRate={setRate}
        currency={from}
        setCurrency={setFrom}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleSwap}
        className={classes.swapButton}
      >
        <SyncIcon />
      </Button>
      <CurrencyAutosuggest
        setRate={setRate}
        currency={to}
        setCurrency={setTo}
      />
      <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue={date.value}
        onInput={handleDateChange}
        variant="outlined"
        className={classes.callendarInput}
        error={!date.isValid}
        onFocus={() => {
          setDate({ ...date, isValid: true });
        }}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleCalculateRates}
      >
        calculate
      </Button>
    </div>
  );
};

export default CurrencyInputContainer;
