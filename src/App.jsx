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
  const [userProvidedData, setUserProvidedData] = useState(null)


  const[pause, setPause] = useState(0)
  const[clearIntervalData, setClearIntervalData] =  useState()

  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",

    iconUrl: dotIcon,
    iconSize: [15, 15] // size of the icon
  });

  const markers = [];

  // generating the default geocodes for the drones
  for (let i = 0; i < 20 ; i++) {
    markers.push({
      geocode: [18.5196 + i * 0.0001, 73.8554 + i*0.0001] , // Adjust the geocode values as needed
      popUp: `Hello, I am pop up ${i}`,
    });
  }




const startPlot =  ()=>{
  const DATALENGTH = markers.length;
  if(pause == 0){
    setMarkersMain([])
  }
  
  let index = pause;

  const intervalId = setInterval(() => {
    if (index < DATALENGTH) {
      setMarkersMain(prev => [...prev, markers[index]]);
      setPause(prev => index)
      console.log(markersMain); // You can replace this with any logic you want
      index++;
    } else {
      setPause(0)
      clearInterval(intervalId);
    }
  }, 500);

  setClearIntervalData(intervalId)



}

const pausePlot = ()=>{
  clearInterval(clearIntervalData)


}

const startCustomPlot = ()=>{
  const DATALENGTH = userProvidedData.locations.length;
  if(pause == 0){
    setMarkersMain([])
  }
  
  let index = pause;
  const intervalId = setInterval(() => {
    if (index < DATALENGTH) {
      setMarkersMain(prev => [...prev, userProvidedData.locations[index]]);
      setPause(prev => index)
      console.log(userProvidedData.locations[index]); // You can replace this with any logic you want
      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 500);
  setClearIntervalData(intervalId)


}





  return (
    <div className="App">
      <div className='flex justify-between p-3'>

        <div className='flex gap-2 text-white'> 


      <button className='bg-pink-600 px-6 py-2 rounded-md h-10 shadow-md my-6 font-medium'
      onClick={() => startPlot()}
      >Start</button>

      <button className='bg-pink-600 px-6 py-2 rounded-md h-10 shadow-md my-6 font-medium'
      onClick={() => startCustomPlot()}
      >Start User Sim</button> 

      <button className='bg-pink-600 px-6 py-2 rounded-md h-10 shadow-md my-6 font-medium'
      onClick={() => pausePlot()}
      >pause</button>

      <button className='bg-pink-600 px-6 py-2 rounded-md h-10 shadow-md my-6 font-medium'
      onClick={() => {
        setMarkersMain([])
        setPause(prev => 0)
      }}
      >reset</button>
      
      </div>
      

            {/* <ArrayInputForm/> */}
            <JsonInputForm setUserProvidedData={setUserProvidedData} />

          
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
