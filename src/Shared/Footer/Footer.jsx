import React from "react";
import "./Footer.css";
import Wave from "../img/wave.png";
import Insta from "@iconscout/react-unicons/icons/uil-instagram";
import Facebook from "@iconscout/react-unicons/icons/uil-facebook";

const Footer = () => {
  return (
    <div>
      <div>
        <div className="footer">
          <img src={Wave} alt="" style={{ width: "100%" }} />
          <div className="f-content">
            <span>&copy; 2022 EthLand - All rights reserved</span>
            <div className="f-icons">
              <Insta color="white" size={"3rem"} />
              <Facebook color="white" size={"3rem"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
