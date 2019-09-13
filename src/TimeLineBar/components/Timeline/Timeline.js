import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { format } from 'date-fns';
import { scaleTime } from 'd3-scale';
import ArrowTooltip from './ArrowTooltip';

const useStyles = makeStyles({
  root: {
    margin: 30,
    width: '100%'
  }
});

// Helpers
const day = 1000 * 60 * 60 * 24;

const formatTick = ms => {
  return format(new Date(ms), 'MMM yy');
}

const formatDate = ms => {
  return format(new Date(ms), 'dd-MM-yy');
}

const buildMarks = dateTicks => {
  return dateTicks.map(tick => {
    return {
      value: tick,
      label: formatTick(tick)
    };
  });
};

const getValuesDates = dates => {
  return [dates[0].getTime(), dates[1].getTime()];
}

const Timeline = (props) => {
  const classes = useStyles();
  const { minDate, maxDate, selectedDates, onChangeDates } = props;
  const preSelectedDates = getValuesDates(selectedDates);
  const [values, setValues] = useState(preSelectedDates);

  const dateTicks = scaleTime()
    .domain([minDate, maxDate])
    .ticks(12)
    .map(d => +d);

  // Sync timeline values if dates selected change
  useEffect(() => {
    const dates = getValuesDates(props.selectedDates);
    setValues(dates);
  }, [props])

  const marks = buildMarks(dateTicks);

  const handleChangeCommitted = (event, newValues) => {
    setValues(newValues);
    const newDates = [new Date(newValues[0]), new Date(newValues[1])];
    onChangeDates(newDates);
  }

  const handleChangeDates = (event, newValues) => {
    setValues(newValues);
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Timeline
      </Typography>
      <Slider
        value={values}
        onChange={handleChangeDates}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={formatDate}
        step={day}
        max={maxDate.getTime()}
        min={minDate.getTime()}
        marks={marks}
        ValueLabelComponent={ArrowTooltip}
      />
    </div>
  );
}

export default Timeline;