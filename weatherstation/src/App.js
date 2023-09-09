import './App.css';
import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker } from "react-map-gl";

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

  const [viewPort, setViewPort] = useState({
    latitude: -37.840935,
    longitude: 144.946457,
    zoom: 5,
  });

  return (
    <div className="App">
      <div style={{ width: "100vh", height: "100vh" }}>
        <ReactMapGl
          {...viewPort}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          width="100%"
          height="100%"
          mapStyle="https://api.mapbox.com/styles/v1/gabriellajohari/clma6onn9012301r66zogcbfc.html?title=view&access_token=pk.eyJ1IjoiZ2FicmllbGxham9oYXJpIiwiYSI6ImNsbThqaDk2czA4ejMzdnM2MTFuMXZwbjIifQ.0_oO-uF3aP_TvGHlZzFehw&zoomwheel=true&fresh=true#2/37.75/-92.25"
        >
          {data.map(item => (
            <Marker
              key={item.id}
              latitude={item.latitude}
              longitude={item.longitude}
            >
              <div>POINTER</div>
            </Marker>
          ))}
        </ReactMapGl>

      </div>

      {/* {data.map(item => (

        <div>{item.ws_name},{item.longitude},{item.latitude}</div>
      ))} */}
    </div>

  );
}

export default App;