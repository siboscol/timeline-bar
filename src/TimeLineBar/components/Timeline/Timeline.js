import React, { useState } from 'react';
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

const Timeline = (props) => {
  const { minDate, maxDate, selectedDates, onChangeDates } = props;
  const classes = useStyles();

  const preSelectedDates = [selectedDates[0].getTime(), selectedDates[1].getTime()];
  const [value, setValue] = useState(preSelectedDates);
  const [min, setMin] = useState(minDate.getTime());
  const [max, setMax] = useState(maxDate.getTime());

  const dateTicks = scaleTime()
    .domain([min, max])
    .ticks(8)
    .map(d => +d);

  const marks = buildMarks(dateTicks);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (event, newValues) => {
    const newDates = [formatDate(newValues[0]), formatDate(newValues[1])];
    onChangeDates(newDates);
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Timeline
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={formatDate}
        step={day}
        max={max}
        min={min}
        marks={marks}
        ValueLabelComponent={ArrowTooltip}
      />
    </div>
  );
}

export default Timeline;