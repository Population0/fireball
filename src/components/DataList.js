import React, { useState } from "react";
// import Fireball from './Fireball'
import BarChart from "./BarChart";



const DataList = (props) =>{
  let velocity_data=props.data.map((fireball)=>{return{x:fireball.date, y:fireball.velocity}});
  let energy_data=props.data.map((fireball)=>{return{x:fireball.date, y:fireball.energy}});
  const [graphState, setGraphState]=useState(true);
  let renderCounter=0;
console.log(renderCounter)
  const graphStateHandler=()=>{
    if(graphState){
    return {title:"energy",data:energy_data.sort()};
    }else{
  return {title:"velocity",data:velocity_data.sort()};
    }
  }
    return (
      <React.Fragment>
        <button onClick={()=>setGraphState(false)}>Velocity</button> 
        <button onClick={()=>setGraphState(true)}>Energy</button> 
          <BarChart dataProp={graphStateHandler()}/>

        </React.Fragment>
      );
}

export default DataList; 

         /* <ul>
          {props.data.map((fireball) => (
            <Fireball
              date={fireball.date}
              vel={fireball.velocity}
              energy={fireball.energy}
            />
          ))}
        </ul>  */