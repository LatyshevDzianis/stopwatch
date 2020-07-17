import React, {useState, useEffect} from 'react'
import './StopWatch.css'
import Loops from './Loops';

function StopWatch() {
  const [timerId, setTimerId] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)
  const [loops, setLoops] = useState([])

  useEffect(() => {
    if (milliseconds >= 100) {
      setSeconds(seconds + 1)
      setMilliseconds(0)
    }
    if (seconds >= 60) {
      setMinutes(minutes + 1)
      setSeconds(0)
    }
  }, [milliseconds, seconds, minutes])

  const tick = () => {
    setMilliseconds(milliseconds => milliseconds + 1)
  }

  const handleStartClick = () => {
    setTimerId(setInterval(tick, 10))
  }

  const handleStopClick = () => {
    console.log(timerId)
    clearInterval(timerId)
  }

  const handleLoopClick = () => {
    let currentTime = `${minutes}:${seconds}.${milliseconds}`
    setLoops([
      ...loops,
      currentTime
    ])
  }

  return (
    <div className="StopWatch">
      <div className="TimeContainer">
        <span className="Time">{`${minutes}:${seconds}.${milliseconds}`}</span>
      </div>
      <div className="ButtonsContainer">
        <button onClick={handleLoopClick} className="StopWatchButton">Круг</button>
        <button onClick={handleStartClick} className="StopWatchButton">Старт</button>
        <button onClick={handleStopClick} className="StopWatchButton">Стоп</button>
      </div>
      <Loops loops={loops} handleLoopClick={handleLoopClick}/>
    </div>
  )
}

export default StopWatch