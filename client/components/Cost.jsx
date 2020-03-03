import React from 'react';
import { Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 130,
  },
});

const Cost = ({
  handleFilterCostChange,
  filterCostValue,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>Cost</span>
      <Slider valueLabelDisplay="auto" aria-labelledby="range-slider" value={filterCostValue} onChange={(e, v) => handleFilterCostChange(v)} />
    </div>
  );
};

export default Cost;
