import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { currencyOptions } from './../../constants/currencyConstants';
import { getRates } from './../../actions/currencyActions';

const CurrencyDisplay = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [rate, setRate] = useState(0);

  const handleChangeAmount = (event) => {
    event.target.value >= 0 && setAmount(event.target.value);
  };

  const handleChangeFrom = (event, value) => {
    setFrom(value.name);
  };

  const handleChangeTo = (event, value) => {
    setTo(value.name);
  };

  const handleSwap = () => {
    let tempValue = from;
    setFrom(to);
    setTo(tempValue);
  };

  const handleCalculateRates = async () => {
    const fromSymbol = currencyOptions.find((element) => element.name === from)
      .symbol;

    const toSymbol = currencyOptions.find((element) => element.name === to)
      .symbol;

    const result = await getRates(fromSymbol, toSymbol);

    result.success &&
      setRate(result.rates[toSymbol] / result.rates[fromSymbol]);
  };

  const getCalculatedAmount = (amount) => Math.round(amount * rate * 100) / 100;

  const getToday = () => {
    const now = new Date();

    return `${now.getDate()}-${now.getUTCMonth()}-${now.getFullYear()}`;
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
        >
          Currency Calculator
        </Typography>
        <div>
          <TextField
            label="Amount"
            value={amount}
            onChange={handleChangeAmount}
            type="number"
            variant="outlined"
          />

          <Autocomplete
            options={currencyOptions}
            getOptionLabel={(option) => option.name}
            inputValue={from}
            onChange={handleChangeFrom}
            renderInput={(params) => (
              <TextField {...params} label="From" variant="outlined" />
            )}
          />
          <Button onClick={handleSwap}>Swap</Button>
          <Autocomplete
            options={currencyOptions}
            getOptionLabel={(option) => option.name}
            inputValue={to}
            onChange={handleChangeTo}
            renderInput={(params) => (
              <TextField {...params} label="To" variant="outlined" />
            )}
          />
          <Button onClick={handleCalculateRates}>calculate</Button>
        </div>
        {rate !== 0 && (
          <div>
            <div>{`${amount} ${from} = ${getCalculatedAmount(
              amount
            )} ${to}`}</div>
            <div>
              {`1 ${from} is worth ${getCalculatedAmount(
                1
              )} ${to} on ${getToday()} `}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CurrencyDisplay;
