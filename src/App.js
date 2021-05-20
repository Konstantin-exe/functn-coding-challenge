import React, { useState, useEffect } from 'react';
import './styling/App.css';

function App() {
  const [allTrucks, setAllTrucks] = useState([]);
  const [input, setInput] = useState('Truck 1');

  useEffect(() => {
    showAllTrucks();
  }, [input]);

  async function showAllTrucks() {
    const response = await fetch('https://node-challenge.functn.workers.dev/');
    const allTrucks = await response.json();
    setAllTrucks(allTrucks);
  }

  const amountOfTrucks = allTrucks.length;
  let filteredTrucks = [];
  let trucksOnRoute = 0;
  let trucksIdle = 0;

  async function getFilteredTrucks() {
    await allTrucks.map((truck) => {
      if (truck.name.includes(input)) {
        filteredTrucks.push(truck);
      }
    });
  }
  getFilteredTrucks();

  async function statusOnroute() {
    await allTrucks.forEach((truck) => {
      if (truck.status === 'onroute') {
        trucksOnRoute++;
      }
    });
  }
  statusOnroute();

  async function statusOnIdle() {
    await allTrucks.forEach((truck) => {
      if (truck.status === 'idle') {
        trucksIdle++;
      }
    });
  }
  statusOnIdle();

  return (
    <div className="App">
      <label>Search for Truckname: </label>
      <input
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        {filteredTrucks.map((truck) => (
          <p>{truck.name}</p>
        ))}
      </div>

      <div className="container">
        {allTrucks.map((truck) => (
          <div key={truck.id} className="trucks">
            <h2>{truck.name}</h2>
            <span>{truck.status}</span>
          </div>
        ))}
      </div>
      <div className="infos">
        <h1>Amount of Trucks: {amountOfTrucks}</h1>
        <h1>Amount on Route: {trucksOnRoute}</h1>
        <h1>Amount Idle: {trucksIdle}</h1>
      </div>
    </div>
  );
}

export default App;
