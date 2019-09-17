import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { subDays, addDays, startOfToday, format, isEqual } from 'date-fns';
import { Timeline, DatesPicker } from './components';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    color: 'white'
  },
  bar: {
    top: 'auto',
    bottom: 0,
    width: '100%',
    height: 90
  }
});

const today = startOfToday();
const fourDaysAgo = subDays(today, 4);
const oneWeekAgo = subDays(today, 7);
const oneYearAgo = subDays(today, 365);
const twoYearAgo = subDays(today, 2 * 365);

const formatDate = date => {
  return format(date, 'yyyy-MM-dd');
};

const areDatesNotEqual = (newDates, currentDates) => {
    const [newStartDate, newEndDate] = newDates;
    const [currentStartDate, currentEndDate] = currentDates;
    return !isEqual(newStartDate,currentStartDate) || !isEqual(newEndDate,currentEndDate)
  }


const TimeLineBar = props => {
  const classes = useStyles();
  const { onChangeDates } = props;
  const [selectedDates, setSelectedDates] = useState([oneWeekAgo, today]);
  const [startDate, setStartDate] = useState(oneYearAgo);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    onChangeDates(selectedDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDatesChanged = dates => {
    console.log('Timeline changed', dates);
    if( areDatesNotEqual(dates, selectedDates)) {
        setSelectedDates(dates);
        onChangeDates(dates);
    }
  };

  const handleCalendarChange = dates => {
    console.log('Calendar changed', dates);
    const [calStartDate, calEndDate] = dates;
    if (areDatesNotEqual(dates, selectedDates)) {
        if (calEndDate >= endDate) {
          setEndDate(addDays(calEndDate, 30));
        }
        if (calStartDate <= startDate) {
          setStartDate(subDays(calStartDate, 30));
        }
        setSelectedDates(dates);
        onChangeDates(dates);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar color="default" position="fixed" className={classes.bar}>
        <Toolbar>
          <Timeline
            minDate={startDate}
            maxDate={endDate}
            selectedDates={selectedDates}
            onChangeDates={handleDatesChanged}
          />
          <DatesPicker
            selectedDates={selectedDates}
            onChangeDates={handleCalendarChange}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TimeLineBar;
