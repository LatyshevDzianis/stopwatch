import React, {useState, useEffect} from 'react'
import './StopWatch.css'
import Loops from './Loops';

function StopWatch() {
  const [isPaused, setIsPaused] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
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
    setIsRunning(true)
    setIsPaused(false)
  }

  const handleStopClick = () => {
    if (isPaused) {
      clearInterval(timerId)
      setMinutes(0)
      setSeconds(0)
      setMilliseconds(0)
      setLoops([])
    } else {
      setIsPaused(true)
    }
    setIsRunning(false)
    clearInterval(timerId)
  }

  const handleLoopClick = () => {
    let currentTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    setLoops([
      ...loops,
      currentTime
    ])
  }

  return (
    <div className="StopWatch">
      <div className="TimeContainer">
        <span className="Time">
          {
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
          }
        </span>
      </div>
      <div className="ButtonsContainer">
        <button onClick={handleLoopClick} className="StopWatchButton" disabled={!isRunning}>КРУГ</button>
        <button onClick={handleStartClick} disabled={isRunning} className="StopWatchButton">СТАРТ</button>
        <button onClick={handleStopClick} className="StopWatchButton">{isRunning ? 'Пауза' : 'Стоп'}</button>
      </div>
      <Loops loops={loops} handleLoopClick={handleLoopClick}/>
    </div>
  )
}

export default StopWatch