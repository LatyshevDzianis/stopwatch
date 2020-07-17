import React, {useEffect, useState} from 'react'
import useSound from 'use-sound';
import endSound from '../../sound/sms-alert-3-daniel_simon.wav'
import './Timer.css'

function Timer() {
  const [play] = useSound(endSound)
  const [done, setDone] = useState(true)
  const [timerId, setTimerId] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)

  useEffect(() => {
    if (milliseconds < 0) {
      setMilliseconds(99)
      setSeconds(seconds - 1)
    }
    if (seconds < 0) {
      setSeconds(59)
      setMinutes(minutes - 1)
    }
    if (!minutes && !seconds && !milliseconds) {
      if (timerId) {
        clearInterval(timerId)
        setTimerId(0)
        setDone(true)
        play()
      }
    }
  }, [milliseconds, seconds, minutes, timerId])

  const handleInputChange = event => {
    switch (event.target.name) {
      case "minutes":
        setMinutes(+event.target.value)
        break
      case "seconds":
        setSeconds(+event.target.value)
        break
      case "milliseconds":
        setMilliseconds(+event.target.value)
        break
      default:
        break
    }
  }

  const tick = () => {
    setMilliseconds(milliseconds => milliseconds - 1)
  }

  const handleSetClick = () => {
    if (done) {
      setDone(false)
      setTimerId(setInterval(tick, 10))
    }
  }

  return (
    <div className="Timer">
      <div style={{marginTop: '50px'}}>
        <input onChange={handleInputChange} placeholder="минуты" type='number' name="minutes"/>
        <input onChange={handleInputChange} placeholder="секунды" type='number' name="seconds"/>
        <input onChange={handleInputChange} placeholder="миллисекунды" type='number' name="milliseconds"/>
      </div>
      <div className="TimeContainer">
        <span className="Time">
          {
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
          }
        </span>
      </div>
      <button onClick={handleSetClick} className="TimerButton">ЗАДАТЬ</button>
    </div>
  )
}

export default Timer