// OpenStreetMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const OpenStreetMap = ({ data }) => {
  return (
    <MapContainer
      center={[data[0]?.latitude || 0, data[0]?.longitude || 0]}
      zoom={12}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((point, index) => (
        <Marker key={index} position={[point.latitude, point.longitude]}>
          <Popup>{`Latitude: ${point.latitude}, Longitude: ${point.longitude}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenStreetMap;
