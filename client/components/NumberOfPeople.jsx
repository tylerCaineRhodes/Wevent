import React from 'react';
import { Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 130,
  },
});

const NumberOfPeople = ({
  handleStateChange,
  filterNumOfPeopleValues,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>Number of People</span>
      <Slider valueLabelDisplay="auto" aria-labelledby="range-slider" value={filterNumOfPeopleValues} onChange={(e, v) => handleStateChange(v, 'filterNumOfPeopleValues')} />
    </div>
  );
};

export default NumberOfPeople;
