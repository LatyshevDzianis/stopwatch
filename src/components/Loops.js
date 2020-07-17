import React from 'react'
import './Loops.css'

function Loops({loops}) {
  return (
    <div className="Loops">
      <ul>
        {loops.map(item => <li key={item.index}>{item}</li>)}
      </ul>
    </div>
  )
}

export default Loops