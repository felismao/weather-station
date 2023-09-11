import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
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

  // Fetch data for weatherStations
  useEffect(() => {
    // Fetch data from the API 
    fetch('http://localhost:63268/api/JoinTable', {
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFiltered(data);
        setData(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [])

  const handleFilter = (value) => {
    const res = filtered.filter(f => f.getweatherStation.state.includes(value))
    setData(res);
  }

  const pins = useMemo(
    () =>
      data.map((item, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={item.getweatherStation.longitude}
          latitude={item.getweatherStation.latitude}
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
    [data]
  );


  return (
    <>
      <select onChange={f => handleFilter(f.target.value) || null}  >
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
        // mapStyle="mapbox://styles/gabriellajohari/clmd8lpk4015d01rf8ekj3xqt"
        mapStyle="mapbox://styles/mapbox/dark-v9"


        mapboxAccessToken="pk.eyJ1IjoiZ2FicmllbGxham9oYXJpIiwiYSI6ImNsbWFmbjI5NDBsemszcW1iMGlydWM4M3MifQ.gEJU0ob-x4XuHUpVoa9UHQ"
      >

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.getweatherStation.longitude)}
            latitude={Number(popupInfo.getweatherStation.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              Name: {popupInfo.getweatherStation.ws_name} <br></br>
              Site: {popupInfo.getweatherStation.site}<br></br>
              State: {popupInfo.getweatherStation.state}<br></br>
              Portfolio: {popupInfo.getweatherStation.portfolio}<br></br>
              measured: {popupInfo.getstationData.name}<br></br>
              unit : {popupInfo.getstationData.unit}<br></br>
              AirTemp: {popupInfo.getstationData.AirTemp} <br></br>
              Time :{popupInfo.getstationData.Timestamp}<br></br>
              GHI: {popupInfo.getstationData.GHI} <br></br>
              Wind Drag: {popupInfo.getstationData.WD}<br></br>
              Wind Speed: {popupInfo.getstationData.WS}<br></br>

              {' '}

            </div>

          </Popup>
        )}

      </Map>


    </>
  );

}

export default App;