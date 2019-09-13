import React from 'react';
import './App.css';
import TimeLineBar from './TimeLineBar';

function App() {
  return (
    <div className="App">
      <TimeLineBar onChangeDates={dates => console.log(dates) }/>
    </div>
  );
}

export default App;
