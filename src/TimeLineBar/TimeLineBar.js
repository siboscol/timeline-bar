import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { subDays, startOfToday, format } from 'date-fns';
import Timeline from './components';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: 'white'
  },
  grow: {
    flexGrow: 1
  },
  bar: {
    top: 'auto',
    bottom: 0
  }
}));

const today = startOfToday();
const fourDaysAgo = subDays(today, 4);
const oneWeekAgo = subDays(today, 7);
const oneYearAgo = subDays(today, 365);
const twoYearAgo = subDays(today, 2 * 365);

const TimeLineBar = props => {
  const classes = useStyles();

  const selectedDates = [fourDaysAgo, today];

  const handleDatesChanged = dates => {
    console.log('Dates changed', dates);
  };

  return (
    <div className={classes.root}>
      <AppBar color="default" position="fixed" className={classes.bar}>
        <Toolbar>
          <Timeline
            minDate={oneYearAgo}
            maxDate={today}
            selectedDates={selectedDates}
            onChangeDates={handleDatesChanged}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TimeLineBar;
