import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { currencyOptions } from './../../constants/currencyConstants';

const CurrencyDisplay = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleChangeFrom = (event, value) => {
    setFrom(value.name);
  };

  const handleChangeTo = (event, value) => {
    setTo(value.name);
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
          <Autocomplete
            options={currencyOptions}
            getOptionLabel={(option) => option.name}
            inputValue={to}
            onChange={handleChangeTo}
            renderInput={(params) => (
              <TextField {...params} label="To" variant="outlined" />
            )}
          />
        </div>
      </Container>
    </div>
  );
};

export default CurrencyDisplay;
