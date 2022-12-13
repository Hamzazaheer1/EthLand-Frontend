import React, { useContext } from "react";
import { themeContext } from "../../Context";
import "./FloatingDiv.css";

const FloatinDiv = ({ img, text1, text2 }) => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div
      className="floatingDiv"
      style={{
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
