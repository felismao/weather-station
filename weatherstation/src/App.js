import './App.css';
import React, { useState, useEffect } from 'react';
 
function App() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('http://localhost:63268/api/weatherStations', {
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts
 
  return (
    <div className="App">
      
    </div>
  );
}
 
export default App;