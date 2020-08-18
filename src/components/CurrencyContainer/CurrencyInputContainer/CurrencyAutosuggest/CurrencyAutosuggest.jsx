import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { currencyOptions } from '../../../../constants/currencyConstants';
import useStyles from './currencyAutosuggest.style';

const CurrencyInputContainer = (props) => {
  const { setRate, currency, setCurrency } = props;

  const classes = useStyles();

  const handleChange = (event, value, reason) => {
    if (reason === 'clear') {
      setCurrency({ ...currency, symbol: '', name: '' });
      setRate(0);
    } else {
      setCurrency({ isValid: true, name: value.name, symbol: value.symbol });
      setRate(0);
    }
  };

  const handleInput = (e) => {
    setCurrency({ ...currency, name: e.target.value });
  };

  return (
    <Autocomplete
      options={currencyOptions}
      getOptionLabel={(option) => option.name}
      inputValue={currency.name}
      onChange={handleChange}
      className={classes.autocompleteInput}
      renderInput={(params) => (
        <TextField
          {...params}
          label="To"
          variant="outlined"
          onInput={handleInput}
          error={!currency.isValid}
          onFocus={() => {
            setCurrency({ ...currency, isValid: true });
          }}
        />
      )}
    />
  );
};

export default CurrencyInputContainer;
