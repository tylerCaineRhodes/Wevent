import React from 'react';
import {Slider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

  const useStyles = makeStyles({
    root: {
      width: 130
    }
  });

  export default function NumberOfPeople(){
    const classes = useStyles();
    const [numberOfPeople, setNumberOfPeople] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
      setNumberOfPeople(newValue);
    };
    return (
      <div className={classes.root}>
       <span>Number of People</span>
       <Slider valueLabelDisplay="auto" aria-labelledby="range-slider" value={numberOfPeople} onChange={handleChange} />
      </div>
    )
  }
