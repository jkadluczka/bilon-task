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
  const [from, setFrom] = useState({});
  const [to, setTo] = useState({});
  const [rate, setRate] = useState(0);

  const handleChangeAmount = (event) => {
    event.target.value >= 0 && setAmount(event.target.value);
  };

  const handleChangeFrom = (event, value) => {
    setFrom(value);
  };

  const handleChangeTo = (event, value) => {
    setTo(value);
  };

  const handleSwap = () => {
    let tempValue = from;
    setFrom(to);
    setTo(tempValue);
  };

  const handleCalculateRates = async () => {
    const result = await getRates(from.symbol, to.symbol);

    result.success &&
      setRate(result.rates[to.symbol] / result.rates[from.symbol]);
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
            inputValue={from.name}
            onChange={handleChangeFrom}
            renderInput={(params) => (
              <TextField {...params} label="From" variant="outlined" />
            )}
          />
          <Button onClick={handleSwap}>Swap</Button>
          <Autocomplete
            options={currencyOptions}
            getOptionLabel={(option) => option.name}
            inputValue={to.name}
            onChange={handleChangeTo}
            renderInput={(params) => (
              <TextField {...params} label="To" variant="outlined" />
            )}
          />
          <Button onClick={handleCalculateRates}>calculate</Button>
        </div>
        {rate !== 0 && (
          <div>
            <div>{`${amount} ${from.name} = ${getCalculatedAmount(amount)} ${
              to.name
            }`}</div>
            <div>
              {`1 ${from.symbol} = ${getCalculatedAmount(1)} ${
                to.symbol
              } on ${getToday()} `}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CurrencyDisplay;
