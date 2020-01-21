import React from 'react';
import { Grid, Typography, Paper, Button, TextField } from '@material-ui/core';
import { useStyles } from './HomeStyle';

const MiddleBlock = props => {
  const classes = useStyles();
  const {message, onChoose, path} = props;
  return (
    <Paper className={classes.paper}>
      <Grid className={classes.middleBlock} item>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item className={classes.miniBlock}>
            <Typography>{message}</Typography>
          </Grid>
          <Grid item>
            {/* <TextField onChange={(e) => onChoose(e.target.files)} type='file' variant='outlined' color='primary' /> */}
            <Button variant='contained' color='primary' onClick={onChoose}>Choose</Button>
          </Grid>
        </Grid>
      </Grid>
      {path &&
        <Grid className={classes.middleBlock} item>
        <Typography>Selected Folder : {path}</Typography>
      </Grid>}
    </Paper>
  );
};
export default MiddleBlock;
