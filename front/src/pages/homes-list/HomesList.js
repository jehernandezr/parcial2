import React, { useEffect, useState } from "react";
import "./HomesList.scss";
import { getHomes } from "../../services/utils";
import { Card } from "../../components/card/Card";
import { FormattedMessage } from "react-intl";
import { Notification, notify } from "../../components/notification/Notification";
export const HomesList = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {

    if(!navigator.onLine){
      notify();
      if(localStorage.getItem("houses") === "") {
        setHomes("Loading...")
      } else {
        setHomes(JSON.parse(localStorage.getItem("houses")));
      }
  } else {
      getHomes().then((data) => {setHomes(data)
        localStorage.setItem("houses", JSON.stringify(data));
      });
  }  
  }, []);

  return (
    <div className="container home">
      <h1>
      <FormattedMessage id="spaces" />
      </h1>

     <div className="list-homes">
     {homes && homes.map((home)=> <Card key={home.id} id={home.id} type={home.type} 
      name={home.name} address={home.address}/>)}
     </div>
     <Notification/>
    </div>
  );
};
