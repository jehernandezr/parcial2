import {React, useState} from "react";
import { Link } from "react-router-dom";
import "./CardRoom.scss";

export const CardRoom = (props) => {
  const handleClick=(e)=>{
    props.setSelectedDevices(props.devs)
  }
  return (
    <div id={props.id} className="card card-room" onClick={handleClick}>
      <div className="card-room-body">
        <div className="card-room-body-description">
          <h5 className="card-room-title">{props.name}</h5>
        </div>
      </div>
      <div className="card-room-img-link" >
        {props.type === "kitcken" ? (
          <img src="/kitchen.png" className="card-room-img-top" alt="Icon Home" />
        ) : (
          <img
            src="/living-room.png"
            className="card-room-img-top loft"
            alt="Icon Living-room"
          />
        )}
      </div>
      
    </div>
  );
};



