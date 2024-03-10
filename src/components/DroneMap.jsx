import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';

const DroneMap = ({ data }) => {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: data[0]?.latitude || 0,
    longitude: data[0]?.longitude || 0,
    zoom: 12,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Move to the next point in the time series
      const nextPoint = data.shift();
      if (nextPoint) {
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude: nextPoint.latitude,
          longitude: nextPoint.longitude,
        }));
      } else {
        clearInterval(interval);
      }
    }, 1000); // Adjust the interval based on your data's time intervals

    return () => clearInterval(interval);
  }, [data]);

  return (
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(newViewport) => setViewport(newViewport)}
    >
      <Marker latitude={viewport.latitude} longitude={viewport.longitude} offsetLeft={-20} offsetTop={-10}>
        <div className="drone-marker"></div>
      </Marker>
      <div style={{ position: 'absolute', right: 10, top: 10 }}>
        <NavigationControl />
      </div>
    </ReactMapGL>
  );
};

export default DroneMap;
