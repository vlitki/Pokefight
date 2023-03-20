import React from 'react';
import "./healthBar.css" ;
import clsx from "clsx";

const HealthBar = ({value, maxHP}) =>  {
  
  const barWidth = (value / maxHP) * 100

  const className= clsx({
    "max-green": maxHP,
    "max-gray": value 
  })

 


  return (
    <div className="bar-container">
        <div className={className} >
          <div 
            className="value"
            style={barWidth <= 0 ? {width:"0%"} : { width: `${barWidth}%`}}
            > 
        </div>
      </div>
  </div>
  )
}

export default HealthBar