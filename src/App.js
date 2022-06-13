import './App.css';
import React, { useEffect, useState} from 'react';
import DataList from './components/DataList'

function App() {
  const [dataState, setDataState]=useState([]);
  async function fetchHandler(){
    const response = await fetch("https://ssd-api.jpl.nasa.gov/fireball.api?limit=50");
    const data = await response.json();
    console.log("hey bestie");
    console.log(data.data);
    console.log("hey bestie");
    const transformedData = await data.data.map((fireballData) => {
      return {
        date:fireballData[0],
        velocity:fireballData[7],
        energy:fireballData[8]
      };
    });
    setDataState(transformedData);
  }
useEffect(()=>{
  fetchHandler();
},[]);

  return (
<React.Fragment><h1>NASA DATA!!!</h1><DataList data={dataState}/></React.Fragment>
  );
}

export default App;


