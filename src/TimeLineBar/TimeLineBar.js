import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { subDays, startOfToday, format } from 'date-fns';
import Timeline from './components';
import {
  DateRangePicker,
  DateRange
} from '@matharumanpreet00/react-daterange-picker';
import TextField from '@material-ui/core/TextField';

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
  },
  calendar: {
    position: 'absolute',
    bottom: 100,
    right: 0
  }
}));

const today = startOfToday();
const fourDaysAgo = subDays(today, 4);
const oneWeekAgo = subDays(today, 7);
const oneYearAgo = subDays(today, 365);
const twoYearAgo = subDays(today, 2 * 365);

const formatDate = date => {
  return format(date, 'yyyy-MM-dd');
};

const TimeLineBar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = useState({});
  const [startDate, setStartDate] = useState(formatDate(fourDaysAgo));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [selectedDates, setSelectedDates] = useState([fourDaysAgo, today])

  const handleDatesChanged = dates => {
    console.log('Dates changed', dates);
  };

  const handleCalendarChange = range => {
    setOpen(!open);
    setDateRange(range);
    setStartDate(formatDate(range.startDate));
    setEndDate(formatDate(range.endDate));
    setSelectedDates([range.startDate, range.endDate]);
  };

  console.log('dateRange', dateRange);
  console.log('formated date', startDate);

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
          <TextField
            id="startDate"
            label="Start Date"
            type="date"
            value={startDate}
            InputLabelProps={{
              shrink: true
            }}
            onClick={() => setOpen(!open)}
          />
          <TextField
            id="endDate"
            label="End Date"
            type="date"
            value={endDate}
            InputLabelProps={{
              shrink: true
            }}
            onClick={() => setOpen(!open)}
          />
          <div className={classes.calendar}>
            <DateRangePicker open={open} onChange={handleCalendarChange} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TimeLineBar;
