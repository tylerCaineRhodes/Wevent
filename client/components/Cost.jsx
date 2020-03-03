import React from 'react';
import { Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 130,
  },
});

const Cost = () => {
  const classes = useStyles();
  const [valueOfCost, setValueOfCost] = React.useState([37]);

  const handleChange = (event, newValue) => {
    setValueOfCost(newValue);
  };

  return (
    <div className={classes.root}>
      <span>Cost</span>
      <Slider valueLabelDisplay="auto" aria-labelledby="range-slider" value={valueOfCost} onChange={handleChange} />
    </div>
  );
};

export default Cost;
