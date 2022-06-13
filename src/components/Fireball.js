import React from "react";
import classes from './Fireball.module.css'

const Fireball = (props)=>{
return(
    <li className={classes.fireball}>
        <h3>Date:</h3><ul>{props.date}</ul>
        <h3>Velocity:</h3><p>{props.vel!=null?props.vel:'No Value'}</p>
        <h3>Energy:</h3><p>{props.energy!=null?props.energy:'No Value'}</p>
    </li>
)
}

export default Fireball; 