import React, { useState } from "react";
// import Fireball from './Fireball'
import BarChart from "./BarChart";
import CircleDiagram from "./CircleDiagram";



const DataList = (props) =>{
  let velocity_data=props.data.map((fireball)=>{return{x:fireball.date, y:fireball.velocity}});
  let energy_data=props.data.map((fireball)=>{return{x:fireball.date, y:fireball.energy}});
  const [graphState, setGraphState]=useState(0);
  let renderCounter=0;
console.log(renderCounter)
  const graphStateHandler=()=>{
    if(graphState===1){
    return {title:"energy",data:energy_data.sort()};
    }else if(graphState===0){
  return {title:"velocity",data:velocity_data.sort()};
    }else{
      return {title:"ETL Processes",data:[1,2,0]};
    }
  }
    return (
      <React.Fragment>
        <button onClick={()=>setGraphState(0)}>Velocity</button> 
        <button onClick={()=>setGraphState(1)}>Energy</button> 
        <button onClick={()=>setGraphState(2)}>Circle Diagram</button> 
          {graphState!==2?<BarChart dataProp={graphStateHandler()}/>:<CircleDiagram dataProp={graphStateHandler()}/>}

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