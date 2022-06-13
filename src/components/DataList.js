import React from "react";
import Fireball from './Fireball'
import CircleChart from "./CircleChart";

const DataList = (props) =>{
  let velocity=props.data.map((fireball)=>fireball.velocity);
    return (
      <React.Fragment>
          <CircleChart data={velocity.sort()}/>
        <ul>
          {props.data.map((fireball) => (
            <Fireball
              date={fireball.date}
              vel={fireball.velocity}
              energy={fireball.energy}
            />
          ))}
        </ul>
        </React.Fragment>
      );
}

export default DataList; 