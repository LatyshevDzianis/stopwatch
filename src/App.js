import React, {useEffect} from 'react';
import StopWatch from './components/StopWatch/StopWatch';
import './App.css'
import Timer from './components/Timer/Timer';
import openTab from './script'

function App() {

  useEffect(() => {
    document.getElementById('Stopwatch').style.display = "block";
    document.getElementById('firstTab').className += " active";
  }, [])

  return (
    <div className="App">
      <div className="tab">
        <button id="firstTab" className="tablinks" onClick={event => openTab(event, 'Stopwatch')}>Секундомер</button>
        <button className="tablinks" onClick={event => openTab(event, 'Timer')}>Таймер</button>
      </div>

      <div id="Stopwatch" className="tabcontent">
        <StopWatch />
      </div>

      <div id="Timer" className="tabcontent">
        <Timer />
      </div>
    </div>
  );
}

export default App;
