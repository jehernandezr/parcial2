import React, { useEffect, useState } from "react";
import "./HomesDetail.scss";
import { getHomeById } from "../../services/utils";
import { CardRoom } from "../../components/card-room/CardRoom";
import { useParams } from "react-router"
import { Table } from 'react-bootstrap';
export const HomeDetail = () => {
  const [homeDetail, setHomeDetail] = useState([]);
  const {id} =useParams();
  const [selectedDevices, setSelectedDevices] = useState(null);
  useEffect(() => {

    if(!navigator.onLine){
      if(localStorage.getItem("homeDetail") === "") {
        setHomeDetail("Loading...")
      } else {
        let dat=JSON.parse(localStorage.getItem("homeDetail"));
        console.log(dat.id)
        if(dat.id ===id)
        {
          setHomeDetail(dat);
        }
        else {
          setHomeDetail("Content not available")
        }
        

      }
  } else {
    getHomeById(id).then((data) => {setHomeDetail(data)
        localStorage.setItem("homeDetail", JSON.stringify(data));
      });
  }  
  }, [id]);

  


  return (
    <div className="container home">
      <h1>
        Mis Habitaciones
      </h1>
     <div className="row">
       <div className="col-6">
         <div className="row">
         {homeDetail && homeDetail.rooms && 
         (homeDetail.rooms).map((room)=> <CardRoom key={room._id} type={room.type} 
        name={room.name}  devs={room.devices} setSelectedDevices={setSelectedDevices}/>)}
         </div>
       </div>
       {selectedDevices ? <TableDevice key={homeDetail.rooms} devs={selectedDevices} />: <div className="col-6">Selecciona habitacion para ver dispositivos</div> }

     </div>
    </div>
  );
};

const TableDevice =({devs})=> {
  const [devicesDetail, setdevicesDetail] = useState(null);
  useEffect(() => {
    setdevicesDetail(devs);
  }, [devs]);
  return (
  <div className="col-6">
    {devicesDetail && (
        <>
  <Table striped bordered hover size="sm"  >
    <thead>
      <tr>
        <th>#</th>
        <th>ID</th>
        <th>Device</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
     {devicesDetail.map((d, index)=>{ return (
      <tr key ={d.id}>
      <td>{index+1}</td>
       <td>{d.id}</td>
       <td>{d.name}</td>
       <td>{d.desired.value}</td>
     </tr>
     )})}
      
    </tbody>
  </Table>  
    </>)}   
  </div>
  );
}
