import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { DateRangePicker } from '@matharumanpreet00/react-daterange-picker';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  calendar: {
    position: 'absolute',
    bottom: 100,
    right: 0
  }
});

const formatDate = date => {
  return format(date, 'yyyy-MM-dd');
};

const DatesPicker = props => {
  const classes = useStyles();
  const { selectedDates, onChangeDates } = props;
  const [open, setOpen] = useState(false);

  const initialDateRange = {
    startDate: selectedDates[0],
    endDate: selectedDates[1]
  };

  const handleCalendarChange = range => {
    setOpen(!open);
    onChangeDates([range.startDate, range.endDate]);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="startDate"
        label="Start Date"
        type="date"
        value={formatDate(selectedDates[0])}
        InputLabelProps={{
          shrink: true
        }}
        onClick={() => setOpen(!open)}
      />
      <TextField
        id="endDate"
        label="End Date"
        type="date"
        value={formatDate(selectedDates[1])}
        InputLabelProps={{
          shrink: true
        }}
        onClick={() => setOpen(!open)}
      />
      <div className={classes.calendar}>
        <DateRangePicker
          open={open}
          initialDateRange={initialDateRange}
          onChange={handleCalendarChange}
        />
      </div>
    </div>
  );
};

export default DatesPicker;
