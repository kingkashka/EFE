import { React, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import ButterCard from "./ButterCard";
import SoapCard from "./SoapCard";

function HomePageSmall(){
    const [butterData, setButterData] = useState([]);
    const [soapData, setSoapData] = useState([]);
    const { userAxios, userState } = useContext(UserContext);

    function getButter() {
        userAxios
          .get("/butter")
          .then((res) => {
            console.log(res.data);
            setButterData(res.data);
          })
          .catch((err) => console.log(err));
      }

      function getSoap() {
        userAxios
          .get(`/soap`)
          .then((res) => {
            console.log(res.data);
            setSoapData(res.data);
          })
          .catch((err) => console.log(err));
      }

      const renderButterCard = butterData.map((item) => (
        <ButterCard image={item.image} title={item.title} price ={`$${item.price}.00`} />
      ));
      const renderSoapCard = soapData.map((item) => (
        <SoapCard image={item.image} title={item.title} price ={`$${item.price}.00`} />
      ));
      useEffect(() => {
        getButter();
        getSoap();
      }, []);
    return(
        <div className="homepage--small">
            <h2>HAND CRAFTED ALL NATURAL SOAP OPTIONS</h2>
            <p>Experience the luxurious sensation of our handcrafted soaps, made with only the highest quality essential oils and natural colorants. Indulge yourself in a truly enriching bathing experience.</p>
            <div className="homepage--products">
            {renderButterCard}
            {renderSoapCard}
            </div>
        </div>
    )
}
export default HomePageSmall