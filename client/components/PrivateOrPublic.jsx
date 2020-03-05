import React from 'react';
import { FormControl, FormControlLabel, Switch } from '@material-ui/core';

const PrivateOrPublic = ({
  handleStateChange,
  filterPublicValue,
  filterPrivateValue,
}) => (
  <>
    <FormControl>
      <FormControlLabel labelPlacement="start" control={<Switch size="medium" label="Public" checked={filterPublicValue} onChange={(e, v) => handleStateChange(v, 'filterPublicValue')} />} label="Public" />
    </FormControl>
    <FormControl>
      <FormControlLabel labelPlacement="start" control={<Switch size="medium" label="Private" checked={filterPrivateValue} onChange={(e, v) => handleStateChange(v, 'filterPrivateValue')} />} label="Private" />
    </FormControl>
  </>
);

export default PrivateOrPublic;
