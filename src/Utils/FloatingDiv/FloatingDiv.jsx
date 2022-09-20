import React from "react";

import "./FloatingDiv.css";
import { useContext } from "react";
import { themeContext } from "../../Context";

const FloatinDiv = ({ img, text1, text2 }) => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    // darkMode
    <div
      className="floatingDiv"
      style={{
        // background: "white",
        background: darkMode ? "white" : "#212529",
      }}
    >
      <img src={img} alt="" />
      <span style={{ color: darkMode ? "black" : "white" }}>
        {text1}
        <br />
        {text2}
      </span>
    </div>
  );
};

export default FloatinDiv;
