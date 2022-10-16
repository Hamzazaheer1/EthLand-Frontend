import React from "react";
import Wave from "../img/wave.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <div>
        <div className="footer">
          <img src={Wave} alt="" style={{ width: "100%" }} />
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
                class="bi bi-facebook cursor-pointer"
                onClick={() => {
                  window.open("https://www.facebook.com/", "_blank");
                }}
              ></i>
              <i
                style={{ fontSize: "2.5rem" }}
                class="bi bi-instagram cursor-pointer"
                onClick={() => {
                  window.open("https://www.instagram.com/", "_blank");
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
