import React from 'react';
import { FormControl, FormControlLabel, Switch } from '@material-ui/core';

const PrivateOrPublic = ({
  handleFilterPublicChange,
  filterPublicValue,
  handleFilterPrivateChange,
  filterPrivateValue,
}) => (
  <>
    <FormControl>
      <FormControlLabel labelPlacement="start" control={<Switch size="medium" label="Public" checked={filterPublicValue} onChange={(e, v) => handleFilterPublicChange(v)} style={{ color: 'orange' }} />} label="Public" />
    </FormControl>
    <FormControl>
      <FormControlLabel labelPlacement="start" control={<Switch size="medium" label="Private" checked={filterPrivateValue} onChange={(e, v) => handleFilterPrivateChange(v)} style={{ color: '#fc6565' }}/>} label="Private" />
    </FormControl>
  </>
);

export default PrivateOrPublic;
