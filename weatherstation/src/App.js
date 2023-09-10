import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Map, {
  Marker,
  Popup
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './pin.js';

function App() {
  const [data, setData] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const [filtered, setFiltered] = useState();


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
        setFiltered(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [])

  const handleFilter = (value) => {
    const res = filtered.filter(f => f.state.includes(value))
    setData(res);
  }

  const pins = useMemo(
    () =>
      data.map((item, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={item.longitude}
          latitude={item.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(item);
          }}
        >
          <Pin />

        </Marker>

      )),
    []
  );


  return (
    <>
      {/* <div>
        <label for="State">Choose state:</label>
        <input type ="text" placeholder='search' onChange={f=>handleFilter(f.target.value)}/>
      </div> */}

      <select onChange={f => handleFilter(f.target.value)} >
        <option value="">All State</option>
        <option value="VIC">VIC</option>
        <option value="NSW">NSW</option>
        <option value="SA">SA</option>
        <option value="QLD">QLD</option>
      </select>
      <Map
        initialViewState={{
          latitude: -34.088539,
          longitude: 146.503152,
          zoom: 4,
          bearing: 0,
          pitch: 0
        }}
        // mapStyle="mapbox://styles/gabriellajohari/clma6onn9012301r66zogcbfc"
        mapStyle="mapbox://styles/mapbox/dark-v9"


        mapboxAccessToken="pk.eyJ1IjoiZ2FicmllbGxham9oYXJpIiwiYSI6ImNsbWFmbjI5NDBsemszcW1iMGlydWM4M3MifQ.gEJU0ob-x4XuHUpVoa9UHQ"
      >

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              Name: {popupInfo.ws_name} <br></br>
              Site: {popupInfo.site}<br></br>
              State: {popupInfo.state}<br></br>
              Portfolio: {popupInfo.portfolio}<br></br>
              {' '}

            </div>

          </Popup>
        )}

      </Map>


    </>
  );

}

export default App;