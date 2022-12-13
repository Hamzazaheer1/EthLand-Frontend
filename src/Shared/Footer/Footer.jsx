import React from "react";
import GreenWave from "../img/greenwave.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" style={{ marginTop: "5rem" }}>
      <img src={GreenWave} alt="" style={{ width: "100%", height: "20rem" }} />
      <div className="f-content">
        <span>
          <b>
            <i className="bi bi-c-circle"></i> 2022 EthLand - All rights
            reserved
          </b>
        </span>
        <div className="f-icons">
          <i
            style={{ fontSize: "2.5rem" }}
            className="bi bi-facebook cursor-pointer"
            onClick={() => {
              window.open("https://www.facebook.com/", "_blank");
            }}
          ></i>
          <i
            style={{ fontSize: "2.5rem" }}
            className="bi bi-instagram cursor-pointer"
            onClick={() => {
              window.open("https://www.instagram.com/", "_blank");
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
