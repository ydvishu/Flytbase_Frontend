import React, { useEffect, useState } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import dotIcon from "../public/new-moon.png";
import JsonInputForm from './components/JsonInputForm';
import ArrayInputForm from './components/ArrayInputForm';
// import MarkerClusterGroup from "react-leaflet-cluster";

const App = () => {

  const [markersMain, setMarkersMain] = useState([])
 

  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",

    iconUrl: dotIcon,
    iconSize: [15, 15] // size of the icon
  });

  const markers = [];

  for (let i = 0; i < 20 ; i++) {
    markers.push({
      geocode: [18.5196 + i * 0.0001, 73.8554 + i*0.0001] , // Adjust the geocode values as needed
      popUp: `Hello, I am pop up ${i}`,
    });
  }




const startPlot =  ()=>{
  const DATALENGTH = markers.length;
  setMarkersMain([])
  let index = 0;
  const intervalId = setInterval(() => {
    if (index < DATALENGTH) {
      setMarkersMain(prev => [...prev, markers[index]]);
      console.log(markersMain); // You can replace this with any logic you want
      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 500);

}

const startCustomPlot = ()=>{
  const DATALENGTH = userProvidedData.locations.length;
  setMarkersMain([])
  let index = 0;
  const intervalId = setInterval(() => {
    if (index < DATALENGTH) {
      setMarkersMain(prev => [...prev, userProvidedData.locations[index]]);
      console.log(userProvidedData.locations); // You can replace this with any logic you want
      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 500);

}





  return (
    <div className="App">
      <div className='flex justify-between p-3'>

      <button className='bg-pink-600 px-6 py-2 rounded-md h-10 shadow-md my-6 font-medium'
            onClick={() => startPlot()}
            >Start Simulation</button>
            <button className='bg-pink-600 px-6 py-2 rounded-md h-10 shadow-md my-6 font-medium'
            onClick={() => console.log(userProvidedData,"\n", markersMain)}
            >Console Log</button>

            <ArrayInputForm/>

          
        </div>
        <div className='p-3 flex justify-center'>
          
      <MapContainer center={[18.5196, 73.8554]} zoom={18} className='drop-shadow-lg'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        
        {markersMain.map((marker,index) => {
          
          return (<>
            {marker?
            <Marker position={marker.geocode} icon={customIcon} key={index}>
            <Popup>{marker.popUp}</Popup>
          </Marker>:<></>}
          </>
          )
        }
        
        
        )}

      </MapContainer>
        </div>
    </div>
  );
};

export default App;
