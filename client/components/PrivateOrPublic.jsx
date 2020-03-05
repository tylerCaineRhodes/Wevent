import React from 'react';
import { FormControl, FormControlLabel, Switch } from '@material-ui/core';

const PrivateOrPublic = ({
  handleStateChange,
  filterPublicValue,
  filterPrivateValue,
  filterEvents,
}) => (
  <>
    <FormControl>
      <FormControlLabel labelPlacement="start" control={<Switch size="medium" label="Public" checked={filterPublicValue} onChange={(e, v) => handleStateChange(v, 'filterPublicValue', filterEvents)} style={{ color: 'orange' }} />} label="Public" />
    </FormControl>
    <FormControl>
      <FormControlLabel labelPlacement="start" control={<Switch size="medium" label="Private" checked={filterPrivateValue} onChange={(e, v) => handleStateChange(v, 'filterPrivateValue', filterEvents)} style={{ color: '#fc6565' }} />} label="Private" />
    </FormControl>
  </>
);

export default PrivateOrPublic;
