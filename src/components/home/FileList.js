import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { useStyles } from './HomeStyle';

const FileList = props => {
  const classes = useStyles();
  const { title, list } = props;
  return (
    <Grid container direction='column' alignItems='center' className={classes.sideList}>
      <Grid item>
        <Paper className={classes.paper}>
        <Typography variant='inherit'>{title}</Typography>
        </Paper>
      </Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <Grid container direction='column'>
            {list && list.map((item, index) => (
              <Grid className={classes.listItem} item key={index}>
                {index + 1}. {item}
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default FileList;
