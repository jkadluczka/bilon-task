import React from 'react';
import useStyles from './currencyDisplay.style';
import Typography from '@material-ui/core/Typography';

const CurrencyDisplay = (props) => {
  const { amount, to, from, date, rate } = props;

  const classes = useStyles();

  const getCalculatedAmount = (amount) => Math.round(amount * rate * 100) / 100;

  return (
    <div className={classes.data}>
      <Typography variant="body1">{`${amount} ${
        from.name
      } = ${getCalculatedAmount(amount)} ${to.name}`}</Typography>
      <Typography variant="body2">
        {`1 ${from.symbol} = ${getCalculatedAmount(1)} ${
          to.symbol
        } on ${date} `}
      </Typography>
    </div>
  );
};

export default CurrencyDisplay;
