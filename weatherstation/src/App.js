import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './pin.js';

function App() {
  const [data, setData] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);


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
      <Map
        initialViewState={{
          latitude: -37.840935,
          longitude: 144.946457,
          zoom: 5,
          bearing: 0,
          pitch: 0
        }}
        // mapStyle="mapbox://styles/gabriellajohari/clma6onn9012301r66zogcbfc"
        mapStyle="mapbox://styles/mapbox/dark-v9"

        mapboxAccessToken="pk.eyJ1IjoiZ2FicmllbGxham9oYXJpIiwiYSI6ImNsbWFmbjI5NDBsemszcW1iMGlydWM4M3MifQ.gEJU0ob-x4XuHUpVoa9UHQ"
      >

        {pins}

      </Map>

    </>
  );

}

export default App;