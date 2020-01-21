import React from 'react';
import { TextField } from '@material-ui/core';

const Account = props => {
  return (
    <React.Fragment>
      <TextField
        variant='outlined'
        name='name'
        onChange={e => console.log(e.target.value)}
        label='Full Name'
      />
    </React.Fragment>
  );
};
export default Account;
