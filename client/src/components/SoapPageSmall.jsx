import { React, useEffect, useState } from "react";
import axios from "axios";
import productData from "../data/productData";
import SoapCard from "./SoapCard";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";


function SoapPageSmall() {
  const [soapData, setSoapData] = useState([]);
  const { userAxios } = useContext(UserContext);

  function getSoap() {
    userAxios
      .get(`/soap`)
      .then((res) => {
        console.log(res.data);
        setSoapData(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getSoap();
  }, []);

  const renderSoapCard = soapData.map((item) => (
    <SoapCard image={item.image} title={item.title} price ={`$${item.price}.00`} />
  ));

  return (
    <>
    <div id="soap--page" className="soap--page">
      {renderSoapCard}
    </div>
    </>
  );
}
export default SoapPageSmall;