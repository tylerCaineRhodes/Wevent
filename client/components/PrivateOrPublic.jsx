import React from 'react';
import { FormControl, FormControlLabel, Switch } from '@material-ui/core';

const PrivateOrPublic = () => (
  <>
    <FormControl>
      <FormControlLabel labelPlacement="start" control={<Switch size="medium" checked={false} />} label="Public" />
    </FormControl>
    <FormControl>
      <FormControlLabel labelPlacement="start" control={<Switch size="medium" checked={false} />} label="Private" />
    </FormControl>
  </>
);

export default PrivateOrPublic;
